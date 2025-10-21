import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Produto {
    @ObjectIdColumn({ name: '_id' })
    @Exclude()
    _id: ObjectId;

    @Column('text')
    nome: string;

    @Column('float')
    preco: number;

    @CreateDateColumn()
    create_at: Date;
}
