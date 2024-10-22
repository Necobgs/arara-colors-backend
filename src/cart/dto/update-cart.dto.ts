import { IsNumber } from "class-validator";

export class UpdateCartDto {

    @IsNumber({maxDecimalPlaces:2})
    total_price:number

}
