import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MongoRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const CHAVE_JWT = 'LP2APINEST'  //ATIVIDADE N2

@Injectable()
export class UsuariosService {
  
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: MongoRepository<Usuario>
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto) {
    const novoUsuario = new Usuario();
    novoUsuario.nome = createUsuarioDto.nome;
    novoUsuario.email = createUsuarioDto.email;
    novoUsuario.senha = await bcrypt.hash(createUsuarioDto.sennha,10);
    return this.usuarioRepository.save(novoUsuario);

    return 'ATIVIDADE N2: Não devolver a sneha do usuário! Apenas uma msg'
  }

  async login(email: string, senha: string) {
    const usuarioBD = await this.usuarioRepository.findOneBy({ email: email })

    if (usuarioBD === null) return 'Usuário não cadastrado!';
    
    const senhaCorreta = bcrypt.compare(senha, usuarioBD.senha);

    if (senhaCorreta) {
      const dadosParaEncriptar = {nome: usuarioBD.nome, email: usuarioBD.email}
      const token = jwt.sign(dadosParaEncriptar, CHAVE_JWT, { expiresIn: '1d' })
      return { token_jwt: token }
    }
    return '[ERRO]: Usuáris ou senha incorretos!';
  }

  findAll() {
    return `ATIVIDADE N2`;
  }

  findOne(id: number) {
    return `ATIVIDADE N2`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `ATIVIDADE N2`;
  }

  remove(id: number) {
    return `ATIVIDADE N2`;
  }
}
