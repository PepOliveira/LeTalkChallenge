"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { CompanyResult } from "@/components/company-result";
import { SearchHistory } from "@/components/search-history";
import { enrichLead } from "@/lib/api";
import { Lead, LeadResponse } from "@/lib/types";
import { HistoryEntry, loadHistory, saveEntry } from "@/lib/history";

export function EnrichmentPage() {
  const queryClient = useQueryClient();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [displayed, setDisplayed] = useState<LeadResponse | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>(undefined);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const mutation = useMutation<LeadResponse, Error, Lead>({
    mutationFn: enrichLead,
    onSuccess: (data) => {
      queryClient.setQueryData(["cnpj", data.empresa.cnae.codigo, data.lead.cnpj], data);
      const entry = saveEntry(data.lead, data.empresa);
      setHistory((prev) => [entry, ...prev].slice(0, 20));
      setDisplayed(data);
    },
  });

  function handleHistorySelect(entry: HistoryEntry) {
    setSelectedLead({ ...entry.lead });
    setFormKey((k) => k + 1);
    setDisplayed({ lead: entry.lead, empresa: entry.empresa });
    mutation.reset();
  }

  const status = mutation.isPending
    ? "loading"
    : displayed
      ? "success"
      : mutation.isError
        ? "error"
        : "idle";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-4 sm:gap-6 items-start">
      <div className="lg:sticky lg:top-[72px] flex flex-col gap-4">
        <div className="glass rounded-2xl shadow-xl shadow-blue-900/8">
          <CardHeader className="pt-6 pb-4">
            <CardTitle className="text-base font-semibold">Dados do lead</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para consultar os dados da empresa.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <LeadForm
              key={formKey}
              onSubmit={(lead) => {
                setDisplayed(null);
                mutation.mutate(lead);
              }}
              isLoading={mutation.isPending}
              initialValues={selectedLead}
            />
          </CardContent>
        </div>

        <SearchHistory
          entries={history}
          onSelect={handleHistorySelect}
          onEntriesChange={setHistory}
        />
      </div>

      <CompanyResult
        status={status}
        company={displayed?.empresa ?? null}
        lead={displayed?.lead ?? null}
        error={mutation.error?.message ?? null}
      />
    </div>
  );
}
