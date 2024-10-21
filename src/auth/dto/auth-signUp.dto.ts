import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class AuthUpDto{

    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string

    @IsString()
    @IsOptional()
    addres?:string;

    @IsPhoneNumber('BR')
    @IsOptional()
    phone?:string;

}