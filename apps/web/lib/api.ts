import { EnrichedCompany } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCompanyByCnpj(cnpj: string): Promise<EnrichedCompany> {
  const sanitized = cnpj.replace(/\D/g, "");

  const response = await fetch(`${API_URL}/cnpj/${sanitized}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao consultar o CNPJ.");
  }

  return data;
}
