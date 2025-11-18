import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProdutosService {

   constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: MongoRepository<Produto>
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const novoProduto = new Produto();
    novoProduto.nome = createProdutoDto.nome;
    novoProduto.preco = createProdutoDto.preco;
    return this.produtoRepository.save(novoProduto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  async findOne(id: string) {
    const idConvertidoEmObjectId = new ObjectId(id)
    const produto = await this.produtoRepository.findOneBy({ _id:  idConvertidoEmObjectId})
    return (produto != null)? produto : '[AVISO]: Produto não encontrado!'
  }

  async findOneByName(nome: string): Promise<any> {
    
    const p = await this.produtoRepository.findOneBy({ nome: nome })
    .then((produtoBD) => {
      console.log(produtoBD)
      return produtoBD
    })
    .catch((erro) => {
      console.log(erro)
    })
    return p 
  }

  update(id: string, updateProdutoDto: UpdateProdutoDto) {
    if(!updateProdutoDto.nome && !updateProdutoDto.preco)
      return '[ERRO] Informar nome e/ou preço!'

    const idConvertidoEmObjectId = new ObjectId(id)
    if(updateProdutoDto.nome && updateProdutoDto.preco)
      return this.produtoRepository.findOneAndUpdate({ _id: idConvertidoEmObjectId }, { $set: { nome: updateProdutoDto.nome, preco: updateProdutoDto.preco }}, { returnDocument: 'after' })
    
    if(updateProdutoDto.nome)
      return this.produtoRepository.findOneAndUpdate({ _id: idConvertidoEmObjectId }, { $set: { nome: updateProdutoDto.nome }}, { returnDocument: 'after' })

    return this.produtoRepository.findOneAndUpdate({ _id: idConvertidoEmObjectId }, { $set: { preco: updateProdutoDto.preco }}, { returnDocument: 'after' })
  }

  async remove(id: string) {
    const idConvertidoEmObjectId = new ObjectId(id)
    const produtoRemovido = await this.produtoRepository.findOneAndDelete({ _id: idConvertidoEmObjectId })
    return (produtoRemovido != null)? '[AVISO]: Produto Removido!' : '[ERRO]: Não foi possível remover o produto'

    /*
    if(produtoRemovido != null)
      return '[AVISO]: Produto Removido!'
    return '[ERRO]: Não foi possível remover o produto'
    */
  }
}
