import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Category {

    @PrimaryGeneratedColumn()
    category_id:Number;

    @Column()
    category_name:string;

    @Column()
    description:string;
}
