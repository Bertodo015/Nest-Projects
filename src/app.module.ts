import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ProdutosModule, 
    ConfigModule.forRoot({ 
      isGlobal: true,
       envFilePath: ['.env.local', '.env'] 
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_BD || 'INSERIR URL DE CONEXAO AQUI!',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true, //recria toda vez que a aplicação roda
      logging: true
    }),
    UsuariosModule
  ], //todos os imports
  controllers: [AppController], //garçom das req
  providers: [AppService], //executa regras de negócio
})
export class AppModule {}
