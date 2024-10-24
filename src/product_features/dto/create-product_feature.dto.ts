import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductFeatureDto {

    @IsInt()
    @IsPositive()
    product_id:number;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    name:string;
}