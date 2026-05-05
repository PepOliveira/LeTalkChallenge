import { Module } from '@nestjs/common';
import { CnpjModule } from './cnpj/cnpj.module';

@Module({
  imports: [CnpjModule],
})
export class AppModule {}
