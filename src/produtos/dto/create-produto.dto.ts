import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    preco: number;

    @IsString()
    email: string;
}
