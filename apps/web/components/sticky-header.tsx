"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function StickyHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;

    function onScroll() {
      const current = window.scrollY;
      setHidden(current > 40 && current > last);
      last = current;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="glass-header sticky top-0 z-10 transition-transform duration-300"
      style={{ transform: hidden ? "translateY(-110%)" : "translateY(0)" }}
    >
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
  );
}
