import { IsInt, IsNumber } from "class-validator";

export class CreateOrderItemDto {
    
    @IsInt()
    order_id:number;

    @IsInt()
    product_id:number;

    @IsNumber({maxDecimalPlaces:2})
    quantity:number;

    @IsNumber()
    price:number;
}