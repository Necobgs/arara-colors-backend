import { IsDate, IsDecimal, IsInt, IsNumber, IsPositive, IsString, Min } from "class-validator";
import { Categories } from "src/categories/entities/category.entity";
import { OneToOne } from "typeorm";

export class CreateProductDto {

    @IsString()
    product_name:string;

    @IsString()
    color_name:string;

    @IsInt()
    @IsPositive()
    quantity_in_stock:number;

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    price:number;

    @IsInt()
    @IsPositive()
    category_id:number;

    @IsInt()
    @Min(1)
    installment_times:number
}
