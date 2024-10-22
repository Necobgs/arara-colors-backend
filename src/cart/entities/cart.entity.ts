import { CartItem } from "src/card-items/entities/cart-item.entity";
import { Customers } from "src/customers/entities/customers.entity";
import { BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'integer'})
    customer_id:number;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    total_price:number

    @OneToMany(() => CartItem, cartItem => cartItem.cart,{onDelete:'CASCADE'})
    cartItems:CartItem[]

    @OneToOne(()=> Customers, customer=> customer.cart)
    customer:Customers
}
