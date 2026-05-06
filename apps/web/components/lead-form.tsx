"use client";

import { useState } from "react";
import { Loader2, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lead } from "@/lib/types";
import { formatCnpj } from "@/lib/cnpj";
import { cn } from "@/lib/utils";

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function FieldWrapper({
  label,
  htmlFor,
  error,
  valid,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  valid: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor}>{label}</Label>
        {valid && !error && (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        )}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function LeadForm({ onSubmit, isLoading }: LeadFormProps) {
  const [form, setForm] = useState<Lead>({
    nome: "",
    email: "",
    telefone: "",
    cnpj: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const fieldValid = {
    nome: form.nome.trim().length > 0,
    email: form.email.trim().length > 0 && isValidEmail(form.email),
    telefone: form.telefone.trim().length > 0,
    cnpj: form.cnpj.replace(/\D/g, "").length === 14,
  };

  const allValid = Object.values(fieldValid).every(Boolean);

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
    } else if (!isValidEmail(form.email)) {
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
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FieldWrapper
        label="Nome completo"
        htmlFor="nome"
        error={errors.nome}
        valid={fieldValid.nome}
      >
        <Input
          id="nome"
          placeholder="ex: João Silva"
          value={form.nome}
          onChange={handleChange("nome")}
          disabled={isLoading}
          aria-invalid={!!errors.nome}
          className={cn(fieldValid.nome && !errors.nome && "border-emerald-400/60 focus-visible:ring-emerald-400/30")}
        />
      </FieldWrapper>

      <FieldWrapper
        label="E-mail"
        htmlFor="email"
        error={errors.email}
        valid={fieldValid.email}
      >
        <Input
          id="email"
          type="email"
          placeholder="ex: joao@empresa.com"
          value={form.email}
          onChange={handleChange("email")}
          disabled={isLoading}
          aria-invalid={!!errors.email}
          className={cn(fieldValid.email && !errors.email && "border-emerald-400/60 focus-visible:ring-emerald-400/30")}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Telefone"
        htmlFor="telefone"
        error={errors.telefone}
        valid={fieldValid.telefone}
      >
        <Input
          id="telefone"
          type="tel"
          placeholder="ex: (11) 99999-0000"
          value={form.telefone}
          onChange={handleChange("telefone")}
          disabled={isLoading}
          aria-invalid={!!errors.telefone}
          className={cn(fieldValid.telefone && !errors.telefone && "border-emerald-400/60 focus-visible:ring-emerald-400/30")}
        />
      </FieldWrapper>

      <FieldWrapper
        label="CNPJ"
        htmlFor="cnpj"
        error={errors.cnpj}
        valid={fieldValid.cnpj}
      >
        <Input
          id="cnpj"
          placeholder="00.000.000/0000-00"
          value={form.cnpj}
          onChange={handleCnpjChange}
          disabled={isLoading}
          aria-invalid={!!errors.cnpj}
          className={cn(fieldValid.cnpj && !errors.cnpj && "border-emerald-400/60 focus-visible:ring-emerald-400/30")}
        />
      </FieldWrapper>

      <div className="flex flex-col gap-2 mt-1">
        {allValid && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-emerald-700 font-medium">
              Tudo certo — pronto para buscar.
            </span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full gap-2"
        >
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
      </div>
    </form>
  );
}
