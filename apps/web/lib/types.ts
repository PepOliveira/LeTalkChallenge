export interface Lead {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
}

export interface EnrichedCompany {
  razao_social: string;
  nome_fantasia: string;
  situacao_cadastral: string;
  cnae: {
    codigo: number;
    descricao: string;
  };
  porte: string;
  capital_social: number;
  localizacao: {
    municipio: string;
    uf: string;
  };
  contato: {
    telefone: string;
    email: string;
  };
  socios: Array<{
    nome: string;
    qualificacao: string;
  }>;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
