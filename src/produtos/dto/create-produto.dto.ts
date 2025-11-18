import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber({}, { message: 'Campo preco deve ser numérico' })
    @IsNotEmpty({ message: 'Campo preco não pode ser vazio' })
    preco: number;
}
