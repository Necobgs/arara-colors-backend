import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}