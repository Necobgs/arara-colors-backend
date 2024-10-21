import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class UpdateCustomerDto{

    @IsString()
    name:string;

    @IsString()
    password:string;

    @IsEmail()
    email:string;

    @IsMobilePhone(`pt-BR`)
    phone:string;

    @IsString()
    addres:string;

}
