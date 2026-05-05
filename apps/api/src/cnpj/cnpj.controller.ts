import { Controller, Get, Param } from '@nestjs/common';
import { CnpjService } from './cnpj.service';
import { EnrichedCompany } from './cnpj.types';

@Controller('cnpj')
export class CnpjController {
  constructor(private readonly cnpjService: CnpjService) {}

  @Get(':cnpj')
  async findByCnpj(@Param('cnpj') cnpj: string): Promise<EnrichedCompany> {
    return this.cnpjService.findByCnpj(cnpj);
  }
}
