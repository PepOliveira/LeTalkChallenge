import { Controller, Post, Body } from '@nestjs/common';
import { CnpjService } from './cnpj.service';
import { CreateLeadDto, LeadResponse } from './cnpj.types';

@Controller('leads')
export class CnpjController {
  constructor(private readonly cnpjService: CnpjService) {}

  @Post()
  async enrichLead(@Body() body: CreateLeadDto): Promise<LeadResponse> {
    return this.cnpjService.enrichLead(body);
  }
}
