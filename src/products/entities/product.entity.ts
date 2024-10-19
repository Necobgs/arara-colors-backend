import { Categories } from "src/categories/entities/category.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({name:'products'})
export class Product {

    @PrimaryGeneratedColumn()
    product_id:number;

    @Column()
    product_name:string;

    @Column()
    color_name:string;

    @Column()
    quantity_in_stock:number;

    @Column({type:'decimal'})
    price:number;

    @OneToOne(() => Categories)
    @JoinColumn()
    category = Categories;

    @Column({type:'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    created_at:Date;
    
}
