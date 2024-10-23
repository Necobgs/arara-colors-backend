import { Customers } from "src/customers/entities/customers.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'integer'})
    customer_id:number;

    @Column({type:'integer'})
    product_id:number;    

    @ManyToOne(()=> Customers)
    @JoinColumn()
    customer:Customers

    @ManyToOne(()=>Product)
    @JoinColumn()
    product:Product
}
