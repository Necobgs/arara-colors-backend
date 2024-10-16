import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    category_id:Number;

    @Column()
    category_name:string;

    @Column()
    description:string;
}
