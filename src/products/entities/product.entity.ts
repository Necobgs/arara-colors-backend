import { IsInt, IsNotEmpty, IsPositive, Min } from "class-validator";
import { Categories } from "src/categories/entities/category.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { ProductImage } from "src/product_images/entities/product_image.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BeforeInsert, OneToMany } from "typeorm";

@Entity({name:'products'})
export class Product {

    @PrimaryGeneratedColumn()
    product_id:number;

    @Column()
    @IsNotEmpty()
    product_name:string;

    @Column()
    @IsNotEmpty()
    color_name:string;

    @Column()
    @IsPositive()
    quantity_in_stock:number;

    @Column({type:'decimal',precision:10,scale:2})
    @IsPositive()
    price:number;

    @Column()
    category_id:number;

    @ManyToOne(() => Categories)
    @JoinColumn({name:'category_id'})
    category:Categories;
    
    @Column({type:'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    created_at:Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsPositive()
    price_cash: number;

    @Column()
    @IsInt()
    @Min(1)
    installment_times: number;

    @OneToMany(()=> ProductImage,productImage=>productImage.product)
    @JoinColumn()
    productImages:ProductImage[]

    @OneToMany(()=>Favorite,favorite=> favorite.product)
    favorite:Favorite[]

    @BeforeInsert()
    add_price_cash(){
        this.price_cash = (this.price*0.95)
    }
}
