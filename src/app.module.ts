import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [ProdutosModule],  //todos os imports
  controllers: [AppController], //garçom das requisições
  providers: [AppService],  //executa as regras de negócios
})
export class AppModule {}
