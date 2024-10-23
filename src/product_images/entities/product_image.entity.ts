import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    product_path_image:string;

    @Column()
    product_id:number

    @ManyToOne(()=>Product,product=>product.productImages)
    product:Product

}
