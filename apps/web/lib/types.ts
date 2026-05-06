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
  motivo_situacao: string | null;
  situacao_especial: string | null;
  data_inicio_atividade: string;
  tipo_unidade: string;
  natureza_juridica: {
    codigo: number;
    descricao: string;
  };
  segmento: string;
  cnae: {
    codigo: number;
    descricao: string;
  };
  cnaes_secundarios: Array<{
    codigo: number;
    descricao: string;
  }>;
  porte: string;
  faixa_funcionarios: string;
  regime_tributario: string[];
  capital_social: number;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
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

export interface LeadResponse {
  lead: Lead;
  empresa: EnrichedCompany;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
