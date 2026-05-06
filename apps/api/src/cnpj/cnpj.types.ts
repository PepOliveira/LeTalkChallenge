export interface BrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  motivo_situacao_cadastral: number;
  descricao_motivo_situacao_cadastral: string;
  situacao_especial: string | null;
  data_situacao_especial: string | null;
  natureza_juridica: string;
  codigo_natureza_juridica: number;
  identificador_matriz_filial: number;
  descricao_identificador_matriz_filial: string;
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  cnaes_secundarios: Array<{
    codigo: number;
    descricao: string;
  }>;
  porte: string;
  codigo_porte: number;
  capital_social: number;
  regime_tributario: Array<{
    codigo: number;
    descricao: string;
  }> | null;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  data_inicio_atividade: string;
  ddd_telefone_1: string;
  email: string;
  qsa: Array<{
    nome_socio: string;
    qualificacao_socio: string;
  }>;
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

export class CreateLeadDto {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  cnpj: string;
}

export interface LeadResponse {
  lead: CreateLeadDto;
  empresa: EnrichedCompany;
}
