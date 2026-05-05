import { EnrichmentPage } from "@/components/enrichment-page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-primary tracking-tight">
              LeTalk
            </span>
            <span className="hidden sm:block text-muted-foreground text-sm">/</span>
            <span className="hidden sm:block text-sm text-muted-foreground">
              Identificação de Leads
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Enriquecimento de Dados Cadastrais
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Consulta de empresa
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Informe os dados do lead e o CNPJ para enriquecer o perfil com
            informações estratégicas da empresa.
          </p>
        </div>

        <EnrichmentPage />
      </main>
    </div>
  );
}
