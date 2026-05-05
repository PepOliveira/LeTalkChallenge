"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lead } from "@/lib/types";
import { formatCnpj } from "@/lib/cnpj";

interface LeadFormProps {
  onSubmit: (lead: Lead) => void;
  isLoading: boolean;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  cnpj?: string;
}

export function LeadForm({ onSubmit, isLoading }: LeadFormProps) {
  const [form, setForm] = useState<Lead>({
    nome: "",
    email: "",
    telefone: "",
    cnpj: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function handleCnpjChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCnpj(e.target.value);
    setForm((prev) => ({ ...prev, cnpj: formatted }));
    if (errors.cnpj) setErrors((prev) => ({ ...prev, cnpj: undefined }));
  }

  function handleChange(field: keyof Lead) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!form.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!form.telefone.trim()) newErrors.telefone = "Telefone é obrigatório.";
    if (!form.cnpj.trim()) {
      newErrors.cnpj = "CNPJ é obrigatório.";
    } else if (form.cnpj.replace(/\D/g, "").length !== 14) {
      newErrors.cnpj = "CNPJ incompleto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nome">Nome completo</Label>
        <Input
          id="nome"
          placeholder="ex: João Silva"
          value={form.nome}
          onChange={handleChange("nome")}
          disabled={isLoading}
          aria-invalid={!!errors.nome}
        />
        {errors.nome && (
          <p className="text-xs text-destructive">{errors.nome}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="ex: joao@empresa.com"
          value={form.email}
          onChange={handleChange("email")}
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          type="tel"
          placeholder="ex: (11) 99999-0000"
          value={form.telefone}
          onChange={handleChange("telefone")}
          disabled={isLoading}
          aria-invalid={!!errors.telefone}
        />
        {errors.telefone && (
          <p className="text-xs text-destructive">{errors.telefone}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          placeholder="00.000.000/0000-00"
          value={form.cnpj}
          onChange={handleCnpjChange}
          disabled={isLoading}
          aria-invalid={!!errors.cnpj}
        />
        {errors.cnpj && (
          <p className="text-xs text-destructive">{errors.cnpj}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="mt-1 w-full gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Consultando...
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            Buscar empresa
          </>
        )}
      </Button>
    </form>
  );
}
