import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Senha deve conter pelo menos 6 caracteres' })
    sennha: string;
    
    create_at: Date;
}
