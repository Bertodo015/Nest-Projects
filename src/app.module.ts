import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ProdutosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', 'local']
    }), 
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_BD || 'Inserir a URL do banco',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true, //Somente em modo DEV
      logging: true
    })
 ],  //todos os imports
  controllers: [AppController], //garçom das requisições
  providers: [AppService],  //executa as regras de negócios
})
export class AppModule {}
