"use client";

import { useState } from "react";
import { Loader2, Search, CircleCheck, CheckCircle2, XCircle } from "lucide-react";
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
        <Label htmlFor={htmlFor} className="text-[#374151] font-medium text-sm">
          {label}
        </Label>
        {valid && !error && (
          <CircleCheck className="h-3.5 w-3.5 text-primary" />
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
  const cnpjTyping = form.cnpj.length > 0;

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
      <FieldWrapper label="Nome completo" htmlFor="nome" error={errors.nome} valid={fieldValid.nome}>
        <Input
          id="nome"
          placeholder="ex: João Silva"
          value={form.nome}
          onChange={handleChange("nome")}
          disabled={isLoading}
          aria-invalid={!!errors.nome}
          className={cn(fieldValid.nome && !errors.nome && "border-primary/40")}
        />
      </FieldWrapper>

      <FieldWrapper label="E-mail" htmlFor="email" error={errors.email} valid={fieldValid.email}>
        <Input
          id="email"
          type="email"
          placeholder="ex: joao@empresa.com"
          value={form.email}
          onChange={handleChange("email")}
          disabled={isLoading}
          aria-invalid={!!errors.email}
          className={cn(fieldValid.email && !errors.email && "border-primary/40")}
        />
      </FieldWrapper>

      <FieldWrapper label="Telefone" htmlFor="telefone" error={errors.telefone} valid={fieldValid.telefone}>
        <Input
          id="telefone"
          type="tel"
          placeholder="ex: (11) 99999-0000"
          value={form.telefone}
          onChange={handleChange("telefone")}
          disabled={isLoading}
          aria-invalid={!!errors.telefone}
          className={cn(fieldValid.telefone && !errors.telefone && "border-primary/40")}
        />
      </FieldWrapper>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="cnpj" className="text-[#374151] font-medium text-sm">
            CNPJ
          </Label>
          {cnpjTyping && fieldValid.cnpj && (
            <CircleCheck className="h-3.5 w-3.5 text-primary" />
          )}
        </div>
        <div className="relative">
          <Input
            id="cnpj"
            placeholder="00.000.000/0000-00"
            value={form.cnpj}
            onChange={handleCnpjChange}
            disabled={isLoading}
            aria-invalid={!!errors.cnpj}
            className={cn(
              "pr-9",
              fieldValid.cnpj && !errors.cnpj && "border-primary/40",
            )}
          />
          {cnpjTyping && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {fieldValid.cnpj ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-[#9CA3AF]" />
              )}
            </div>
          )}
        </div>
        {errors.cnpj && <p className="text-xs text-destructive">{errors.cnpj}</p>}
        {cnpjTyping && fieldValid.cnpj && !errors.cnpj && (
          <p className="text-xs text-emerald-600">CNPJ válido</p>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-1">
        {allValid && (
          <div className="flex items-center gap-2 rounded-lg bg-primary/8 border border-primary/20 px-3 py-2">
            <CircleCheck className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs text-primary font-medium">
              Tudo certo — pronto para buscar.
            </span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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
