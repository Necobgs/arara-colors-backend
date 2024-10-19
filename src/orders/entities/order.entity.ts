import { Customers } from "src/customers/entities/customers.entity";
import { OrderStatus } from "src/order_status/entities/order_status.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    order_id:number;

    @ManyToOne(()=>Customers)
    customer:Customers;

    @Column({type:'timestamp',default:()=> 'CURRENT_TIMESTAMP'})
    order_date:Date;

    @Column({type:'decimal',precision:10,scale:2})
    total_amount:number;

    @OneToOne(()=>OrderStatus)
    @JoinColumn()
    status:OrderStatus
}