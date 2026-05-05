export interface BrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  porte: string;
  capital_social: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
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
  segmento: string;
  cnae: {
    codigo: number;
    descricao: string;
  };
  porte: string;
  faixa_funcionarios: string;
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

export class CreateLeadDto {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
}

export interface LeadResponse {
  lead: CreateLeadDto;
  empresa: EnrichedCompany;
}
