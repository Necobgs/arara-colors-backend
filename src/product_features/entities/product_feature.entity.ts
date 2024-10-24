import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductFeature {

    @PrimaryGeneratedColumn()
    feature_id:number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name:string;


    @Column()
    @IsNotEmpty()
    @IsString()
    description:string;


    @Column()
    @IsInt()
    @IsPositive()
    product_id:number

    @ManyToOne(()=> Product)
    @JoinColumn({name:"product_id"})
    product:Product

}
