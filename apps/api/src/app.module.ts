import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CnpjModule } from './cnpj/cnpj.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
      max: 500,
    }),
    CnpjModule,
  ],
})
export class AppModule {}
