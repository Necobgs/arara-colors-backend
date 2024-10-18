import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus {

    @PrimaryGeneratedColumn()
    status_id:number;

    @Column()
    status_name:string;

    @Column()
    description:string;
}
