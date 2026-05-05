export interface BrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  porte: string;
  capital_social: number;
  municipio: string;
  uf: string;
  ddd_telefone_1: string;
  email: string;
  cnaes_secundarios: Array<{
    codigo: number;
    descricao: string;
  }>;
  qsa: Array<{
    nome_socio: string;
    qualificacao_socio: string;
  }>;
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

export interface LeadWithCompany {
  lead: {
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
  };
  empresa: EnrichedCompany;
}
