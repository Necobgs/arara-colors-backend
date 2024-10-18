import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customers {

    @PrimaryGeneratedColumn()
    customer_id:number
    
    @Column()
    name:string

    @Column()
    email:string

    @Column()
    phone:string

    @Column()
    addres:string

}
