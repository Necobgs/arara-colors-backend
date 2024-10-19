import { IsDate, IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateOrderDto {

    @IsInt()
    customer_id:number;

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    total_amount:number;

    @IsInt()
    status_id:number;
}
