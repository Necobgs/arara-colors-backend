import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    category_id:number;

    @Column()
    category_name:string;

    @Column()
    description:string;
}
