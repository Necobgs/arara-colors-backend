import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    name:string

    @IsEmail()
    email:string

    @IsPhoneNumber()
    phone:string

    @IsString()
    addres:string

}
