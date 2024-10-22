import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItem {

    @PrimaryGeneratedColumn()
    cardItem_id:number;

    @Column({type:'integer'})
    cart_id:number;

    @Column({type:'integer'})
    product_id:number;
    
    @Column({type:'integer'})
    quantity:number;

    @Column({type:'decimal',precision:10,scale:2})
    unit_prec:number;

    @Column({type:'decimal',precision:10,scale:2})
    total_price:number;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart: Cart;

    @ManyToOne(() => Product)
    product: Product;
    
    @BeforeInsert()
    add_total(){
        this.unit_prec = this.product.price;
        this.total_price = this.quantity * this.unit_prec;
    }

}
