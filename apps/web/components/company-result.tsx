"use client";

import { Building2, MapPin, Phone, Users, AlertCircle, Tag, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EnrichedCompany, SearchStatus } from "@/lib/types";
import { formatCapital, formatPhone } from "@/lib/cnpj";

interface CompanyResultProps {
  status: SearchStatus;
  company: EnrichedCompany | null;
  error: string | null;
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status?.toUpperCase();
  if (normalized === "ATIVA") {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shrink-0">
        {status}
      </Badge>
    );
  }
  if (normalized === "BAIXADA" || normalized === "INAPTA") {
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border border-red-200 shrink-0">
        {status}
      </Badge>
    );
  }
  return (
    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border border-amber-200 shrink-0">
      {status}
    </Badge>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-foreground">{value || "—"}</span>
    </div>
  );
}

function formatAddress(endereco: EnrichedCompany["endereco"]): string {
  const parts = [
    endereco.logradouro,
    endereco.numero,
    endereco.complemento,
    endereco.bairro,
  ].filter(Boolean);
  const linha1 = parts.join(", ");
  const linha2 = `${endereco.municipio} - ${endereco.uf}${endereco.cep ? `, CEP ${endereco.cep}` : ""}`;
  return linha1 ? `${linha1}\n${linha2}` : linha2;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center px-6">
      <div className="rounded-full bg-muted p-4">
        <Building2 className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground">Nenhuma empresa consultada</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Preencha o formulário ao lado com os dados do lead e clique em{" "}
          <strong>Buscar empresa</strong> para visualizar as informações.
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center px-6">
      <div className="rounded-full bg-red-50 p-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground">Não foi possível consultar</p>
        <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-6 animate-pulse p-1">
      <div className="flex flex-col gap-2">
        <div className="h-6 w-2/3 rounded-md bg-muted" />
        <div className="h-4 w-1/3 rounded-md bg-muted" />
      </div>
      <Separator />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="h-4 w-1/4 rounded-md bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 rounded-md bg-muted" />
            <div className="h-10 rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CompanyData({ company }: { company: EnrichedCompany }) {
  const address = formatAddress(company.endereco);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold leading-tight text-foreground">
            {company.nome_fantasia}
          </h2>
          <StatusBadge status={company.situacao_cadastral} />
        </div>
        <p className="text-sm text-muted-foreground">{company.razao_social}</p>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Tag className="h-4 w-4" />
          Segmento
        </div>
        <div className="rounded-lg border bg-muted/40 p-3 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{company.segmento}</span>
            <span className="text-xs text-muted-foreground font-mono">
              CNAE {company.cnae.codigo}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{company.cnae.descricao}</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          Perfil da empresa
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Porte" value={company.porte} />
          <InfoRow label="Faixa de funcionários" value={company.faixa_funcionarios} />
          <InfoRow label="Capital social" value={formatCapital(company.capital_social)} />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Endereço
        </div>
        <p className="text-sm text-foreground whitespace-pre-line">{address}</p>
      </div>

      {(company.contato.telefone || company.contato.email) && (
        <>
          <Separator />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Phone className="h-4 w-4" />
              Contato da empresa
            </div>
            <div className="grid grid-cols-2 gap-4">
              {company.contato.telefone && (
                <InfoRow
                  label="Telefone"
                  value={formatPhone(company.contato.telefone)}
                />
              )}
              {company.contato.email && (
                <InfoRow label="E-mail" value={company.contato.email} />
              )}
            </div>
          </div>
        </>
      )}

      {company.socios.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              Quadro societário
            </div>
            <div className="flex flex-col gap-2">
              {company.socios.map((socio, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                >
                  <span className="text-sm font-medium">{socio.nome}</span>
                  <span className="text-xs text-muted-foreground">
                    {socio.qualificacao}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function CompanyResult({ status, company, error }: CompanyResultProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">
          Dados da empresa
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === "idle" && <EmptyState />}
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState message={error!} />}
        {status === "success" && company && <CompanyData company={company} />}
      </CardContent>
    </Card>
  );
}
