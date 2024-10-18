import { IsString } from "class-validator";

export class CreateOrderStatusDto {

    @IsString()
    status_name:string;

    @IsString()
    description:string;
}
