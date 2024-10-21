import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class AuthInDto{

    @IsEmail()
    email:string;

    @IsString()
    password:string
}