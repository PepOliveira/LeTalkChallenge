import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import axios from 'axios';
import { BrasilApiCnpjResponse, EnrichedCompany } from './cnpj.types';

@Injectable()
export class CnpjService {
  private readonly brasilApiUrl = 'https://brasilapi.com.br/api/cnpj/v1';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  private sanitizeCnpj(cnpj: string): string {
    return cnpj.replace(/\D/g, '');
  }

  private isValidCnpj(cnpj: string): boolean {
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    const calcDigit = (cnpj: string, length: number): number => {
      let sum = 0;
      let pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += parseInt(cnpj.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
      }
      return sum % 11 < 2 ? 0 : 11 - (sum % 11);
    };

    if (calcDigit(cnpj, 12) !== parseInt(cnpj.charAt(12))) return false;
    if (calcDigit(cnpj, 13) !== parseInt(cnpj.charAt(13))) return false;

    return true;
  }

  private mapToEnriched(data: BrasilApiCnpjResponse): EnrichedCompany {
    return {
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia || data.razao_social,
      situacao_cadastral: data.descricao_situacao_cadastral,
      cnae: {
        codigo: data.cnae_fiscal,
        descricao: data.cnae_fiscal_descricao,
      },
      porte: data.porte,
      capital_social: data.capital_social,
      localizacao: {
        municipio: data.municipio,
        uf: data.uf,
      },
      contato: {
        telefone: data.ddd_telefone_1 || '',
        email: data.email || '',
      },
      socios: (data.qsa || []).map((s) => ({
        nome: s.nome_socio,
        qualificacao: s.qualificacao_socio,
      })),
    };
  }

  async findByCnpj(cnpj: string): Promise<EnrichedCompany> {
    const sanitized = this.sanitizeCnpj(cnpj);

    if (!this.isValidCnpj(sanitized)) {
      throw new BadRequestException('CNPJ inválido.');
    }

    const cacheKey = `cnpj:${sanitized}`;
    const cached = await this.cacheManager.get<EnrichedCompany>(cacheKey);

    if (cached) return cached;

    try {
      const { data } = await axios.get<BrasilApiCnpjResponse>(
        `${this.brasilApiUrl}/${sanitized}`,
      );

      const enriched = this.mapToEnriched(data);
      await this.cacheManager.set(cacheKey, enriched);

      return enriched;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new NotFoundException('CNPJ não encontrado.');
        }
        if (error.response?.status === 429) {
          throw new InternalServerErrorException('Limite de requisições atingido. Tente novamente em instantes.');
        }
      }
      throw new InternalServerErrorException('Erro ao consultar o CNPJ. Tente novamente.');
    }
  }
}
