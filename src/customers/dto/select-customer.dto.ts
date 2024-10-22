import { IsEmail, IsInt, IsOptional, IsPositive } from "class-validator";

export class SelectCustomerDto{

    @IsInt()
    @IsPositive()
    @IsOptional()
    customer_id?:number;

    @IsEmail()
    @IsOptional()
    email?:string;

}