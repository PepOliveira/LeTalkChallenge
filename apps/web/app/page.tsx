import { EnrichmentPage } from "@/components/enrichment-page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-sky-300/15 blur-3xl" />
      </div>

      <header className="glass-header sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-primary tracking-tight">
              LeTalk
            </span>
            <span className="hidden sm:block text-muted-foreground text-sm select-none">
              /
            </span>
            <span className="hidden sm:block text-sm text-muted-foreground">
              Identificação de Leads
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Enriquecimento de Dados Cadastrais
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Consulta de empresa
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Informe os dados do lead e o CNPJ para enriquecer o perfil com
            informações estratégicas da empresa.
          </p>
        </div>

        <EnrichmentPage />
      </main>
    </div>
  );
}
