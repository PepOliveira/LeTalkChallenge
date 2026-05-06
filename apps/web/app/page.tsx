import Image from "next/image";
import { EnrichmentPage } from "@/components/enrichment-page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[100px]"
          style={{ background: "#f6f0e5", opacity: 0.95 }}
        />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ background: "#f6f0e5", opacity: 0.85 }}
        />
        <div
          className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[90px]"
          style={{ background: "#6b62d1", opacity: 0.14 }}
        />
        <div
          className="absolute bottom-[15%] right-[5%] w-[440px] h-[440px] rounded-full blur-[90px]"
          style={{ background: "#6b62d1", opacity: 0.10 }}
        />
        <div
          className="absolute top-[-5%] right-[-5%] w-[420px] h-[420px] rounded-full blur-[80px]"
          style={{ background: "#6b62d1", opacity: 0.13 }}
        />
      </div>

      <header className="glass-header sticky top-0 z-10">
        <div className="max-w-7xl mx-auto pl-3 sm:pl-4 pr-4 sm:pr-8 py-4 sm:py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-letalk.png"
              alt="LeTalk"
              width={110}
              height={34}
              className="shrink-0 w-[80px] sm:w-[110px] h-auto"
              priority
            />
            <div className="hidden sm:block h-6 w-px bg-[#D1D5DB]" />
            <span className="hidden sm:block text-sm text-muted-foreground">
              Identificação de Leads
            </span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Enriquecimento de Dados Cadastrais
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10">
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
