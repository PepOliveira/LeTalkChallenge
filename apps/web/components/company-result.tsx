"use client";

import { Building2, MapPin, Phone, Users, AlertCircle, Tag, Briefcase, Calendar, Scale, TriangleAlert, UserCircle } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EnrichedCompany, Lead, SearchStatus } from "@/lib/types";
import { formatCapital, formatPhone, formatDate } from "@/lib/cnpj";
import { cn } from "@/lib/utils";

interface CompanyResultProps {
  status: SearchStatus;
  company: EnrichedCompany | null;
  lead: Lead | null;
  error: string | null;
}

function statusConfig(status: string) {
  const normalized = status?.toUpperCase();
  if (normalized === "ATIVA") {
    return {
      dot: "bg-teal-500/70",
      band: "bg-teal-50/60 border-teal-200/50",
      text: "text-teal-700",
    };
  }
  if (normalized === "BAIXADA" || normalized === "INAPTA") {
    return {
      dot: "bg-rose-400/70",
      band: "bg-rose-50/60 border-rose-200/50",
      text: "text-rose-700",
    };
  }
  return {
    dot: "bg-amber-400/70",
    band: "bg-amber-50/60 border-amber-200/50",
    text: "text-amber-700",
  };
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white/70 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function formatAddress(endereco: EnrichedCompany["endereco"]): string {
  const parts = [endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro].filter(Boolean);
  const linha1 = parts.join(", ");
  const linha2 = `${endereco.municipio} — ${endereco.uf}${endereco.cep ? `, CEP ${endereco.cep}` : ""}`;
  return linha1 ? `${linha1}\n${linha2}` : linha2;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] gap-5 text-center px-6">
      <div className="rounded-full bg-primary/10 p-5">
        <Building2 className="h-8 w-8 text-primary" />
      </div>
      <div className="flex flex-col gap-2 max-w-xs">
        <p className="text-base font-semibold text-[#111827]">
          Consulte os dados de uma empresa
        </p>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Preencha o formulário ao lado com nome, e-mail, telefone e CNPJ do lead e clique em{" "}
          <strong className="text-[#374151]">Buscar empresa</strong>.
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] gap-4 text-center px-6">
      <div className="rounded-2xl bg-red-50 p-5">
        <AlertCircle className="h-9 w-9 text-red-400" />
      </div>
      <div className="flex flex-col gap-1.5 max-w-xs">
        <p className="font-semibold text-foreground">Não foi possível consultar</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="rounded-xl bg-muted/60 border border-border/40 p-4 flex flex-col gap-3">
        <div className="h-3 w-16 rounded-full bg-muted" />
        <div className="h-7 w-2/3 rounded-lg bg-muted" />
        <div className="h-4 w-1/2 rounded-lg bg-muted" />
        <div className="h-3 w-1/3 rounded-lg bg-muted" />
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl bg-muted/40 border border-border/40 p-4 flex flex-col gap-3">
          <div className="h-3 w-20 rounded-full bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 rounded-lg bg-muted" />
            <div className="h-10 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LeadSummary({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-xl border border-border/50 bg-white/50 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <UserCircle className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground">Lead</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InfoRow label="Nome" value={lead.nome} />
        <InfoRow label="Cargo" value={lead.cargo} />
        <InfoRow label="E-mail" value={lead.email} />
        <InfoRow label="Telefone" value={lead.telefone} />
      </div>
    </div>
  );
}

function CompanyData({ company, lead }: { company: EnrichedCompany; lead: Lead | null }) {
  const config = statusConfig(company.situacao_cadastral);
  const address = formatAddress(company.endereco);
  const since = formatDate(company.data_inicio_atividade);

  return (
    <div className="flex flex-col gap-4">
      {lead && <LeadSummary lead={lead} />}
      <div className={cn("rounded-xl border p-4 flex flex-col gap-3", config.band)}>
        <div className="flex items-center gap-2">
          <span className={cn("inline-block h-2 w-2 rounded-full", config.dot)} />
          <span className={cn("text-xs font-semibold uppercase tracking-wider", config.text)}>
            {company.situacao_cadastral}
          </span>
          {since && (
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Ativo desde {since}
            </span>
          )}
        </div>
        <Separator className="opacity-30" />
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground leading-tight">
            {company.nome_fantasia}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{company.razao_social}</p>
        </div>
      </div>

      {(company.motivo_situacao || company.situacao_especial) && (
        <Section icon={TriangleAlert} title="Alertas">
          <div className="flex flex-col gap-2">
            {company.motivo_situacao && (
              <div className="rounded-md bg-amber-50/80 border border-amber-200/60 px-3 py-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">Motivo da situação</span>
                <p className="text-sm text-amber-800 mt-0.5">{company.motivo_situacao}</p>
              </div>
            )}
            {company.situacao_especial && (
              <div className="rounded-md bg-amber-50/80 border border-amber-200/60 px-3 py-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">Situação especial</span>
                <p className="text-sm text-amber-800 mt-0.5">{company.situacao_especial}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section icon={Scale} title="Identificação">
        <div className="grid grid-cols-2 gap-3">
          <InfoRow label="Tipo de unidade" value={company.tipo_unidade} />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Natureza jurídica</span>
            <span className="text-sm font-medium text-foreground leading-snug">
              {company.natureza_juridica.descricao}
            </span>
          </div>
        </div>
      </Section>

      <Section icon={Tag} title="Segmento">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">{company.segmento}</span>
            <span className="text-xs text-muted-foreground">{company.cnae.descricao}</span>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground font-mono bg-background/70 border rounded-md px-2 py-1">
            {company.cnae.codigo}
          </span>
        </div>
        {company.cnaes_secundarios.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-1 border-t border-border/40">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">CNAEs secundários</span>
            <div className="flex flex-col gap-1">
              {company.cnaes_secundarios.map((cnae) => (
                <div key={cnae.codigo} className="flex items-start justify-between gap-3">
                  <span className="text-xs text-foreground/80 leading-snug">{cnae.descricao}</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground font-mono bg-background/70 border rounded px-1.5 py-0.5">{cnae.codigo}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section icon={Briefcase} title="Perfil">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <InfoRow label="Porte" value={company.porte} />
          <InfoRow label="Funcionários" value={company.faixa_funcionarios} />
          <InfoRow label="Capital social" value={formatCapital(company.capital_social)} />
        </div>
        {company.regime_tributario.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-1 border-t border-border/40">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Regime tributário</span>
            <div className="flex flex-wrap gap-1.5">
              {company.regime_tributario.map((regime) => (
                <span
                  key={regime}
                  className="text-xs font-medium bg-primary/8 text-primary border border-primary/20 rounded-full px-2.5 py-0.5"
                >
                  {regime}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section icon={MapPin} title="Endereço">
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {address}
        </p>
      </Section>

      {(company.contato.telefone || company.contato.email) && (
        <Section icon={Phone} title="Contato">
          <div className="grid grid-cols-2 gap-3">
            {company.contato.telefone && (
              <InfoRow label="Telefone" value={formatPhone(company.contato.telefone)} />
            )}
            {company.contato.email && (
              <InfoRow label="E-mail" value={company.contato.email} />
            )}
          </div>
        </Section>
      )}

      <Section icon={Users} title="Quadro societário">
        {company.socios.length > 0 ? (
          <div className="flex flex-col gap-2">
            {company.socios.map((socio, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0 rounded-lg bg-background/60 border border-border/50 px-3 py-2.5"
              >
                <span className="text-sm font-medium">{socio.nome}</span>
                <span className="text-xs text-muted-foreground">{socio.qualificacao}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Não possui quadro societário.</p>
        )}
      </Section>
    </div>
  );
}

export function CompanyResult({ status, company, lead, error }: CompanyResultProps) {
  return (
    <div className="glass rounded-2xl shadow-xl shadow-blue-900/8 h-full">
      <CardHeader className="pt-6 pb-4">
        <CardTitle className="text-base font-semibold text-foreground">
          Dados da empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        {status === "idle" && <EmptyState />}
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState message={error!} />}
        {status === "success" && company && <CompanyData company={company} lead={lead} />}
      </CardContent>
    </div>
  );
}
