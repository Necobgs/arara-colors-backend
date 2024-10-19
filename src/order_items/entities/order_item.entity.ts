import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    order_item_id:number;

    @ManyToOne(()=>Order)
    @JoinColumn({name:'order_id'})
    order:Order;

    @ManyToOne(()=> Product)
    @JoinColumn({name:'product_id'})
    product:Product;

    @Column({type:'integer'})
    quantity:number;

    @Column({type:'decimal',precision:10,scale:2})
    price:number;
}