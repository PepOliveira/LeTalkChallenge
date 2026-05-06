"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { CompanyResult } from "@/components/company-result";
import { enrichLead } from "@/lib/api";
import { Lead, LeadResponse } from "@/lib/types";

export function EnrichmentPage() {
  const queryClient = useQueryClient();

  const mutation = useMutation<LeadResponse, Error, Lead>({
    mutationFn: enrichLead,
    onSuccess: (data) => {
      queryClient.setQueryData(["cnpj", data.empresa.cnae.codigo, data.lead.cnpj], data);
    },
  });

  const status = mutation.isPending
    ? "loading"
    : mutation.isSuccess
      ? "success"
      : mutation.isError
        ? "error"
        : "idle";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-4 sm:gap-6 items-start">
      <div className="lg:sticky lg:top-[72px]">
        <div className="glass rounded-2xl shadow-xl shadow-blue-900/8">
          <CardHeader className="pt-6 pb-4">
            <CardTitle className="text-base font-semibold">Dados do lead</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para consultar os dados da empresa.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <LeadForm onSubmit={mutation.mutate} isLoading={mutation.isPending} />
          </CardContent>
        </div>
      </div>

      <CompanyResult
        status={status}
        company={mutation.data?.empresa ?? null}
        error={mutation.error?.message ?? null}
      />
    </div>
  );
}
