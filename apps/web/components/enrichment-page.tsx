"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { CompanyResult } from "@/components/company-result";
import { fetchCompanyByCnpj } from "@/lib/api";
import { EnrichedCompany, Lead, SearchStatus } from "@/lib/types";

export function EnrichmentPage() {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [company, setCompany] = useState<EnrichedCompany | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(lead: Lead) {
    setStatus("loading");
    setError(null);
    setCompany(null);

    try {
      const data = await fetchCompanyByCnpj(lead.cnpj);
      setCompany(data);
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro inesperado. Tente novamente.";
      setError(message);
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
      <div className="lg:sticky lg:top-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Dados do lead</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para consultar os dados da empresa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadForm onSubmit={handleSearch} isLoading={status === "loading"} />
          </CardContent>
        </Card>
      </div>

      <CompanyResult status={status} company={company} error={error} />
    </div>
  );
}
