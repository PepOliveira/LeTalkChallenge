import { EnrichmentPage } from "@/components/enrichment-page";
import { StickyHeader } from "@/components/sticky-header";

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

      <StickyHeader />

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
