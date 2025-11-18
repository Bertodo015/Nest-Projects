import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto {
    @ObjectIdColumn()
    _id: string;

    @Column('text')
    nome: string;

    @Column('float')
    preco: number;

    @CreateDateColumn()
    create_at: Date;
}
