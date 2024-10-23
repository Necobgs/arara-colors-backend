import { Cart } from "src/cart/entities/cart.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customers {

    @PrimaryGeneratedColumn()
    customer_id:number
    
    @Column()
    name:string;

    @Column()
    password:string;

    @Column()
    email:string;

    @Column({nullable:true})
    phone:string;

    @Column({nullable:true})
    addres:string;

    @OneToOne(()=> Cart, cart => cart.customer,{onDelete:'CASCADE'})
    cart:Cart

    @OneToMany(()=> Favorite, favorite => favorite.customer,{onDelete:'CASCADE'})
    favorite:Favorite[]
}