import { IsInt, IsPositive } from "class-validator";

export class CreateCartItemDto {

    @IsInt()
    @IsPositive()
    product_id:number;

    @IsInt()
    @IsPositive()
    quantity:number;

}
