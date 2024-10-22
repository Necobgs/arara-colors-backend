import { IsInt } from "class-validator";

export class CreateCartDto {
    @IsInt()
    customer_id:number;
}
