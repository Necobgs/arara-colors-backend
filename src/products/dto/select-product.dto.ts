import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { CreateProductDto } from "./create-product.dto";
import { Type } from "class-transformer";

export class SelectProductDto extends PartialType(CreateProductDto){

    @IsNumber({maxDecimalPlaces:2})
    @Type(()=>Number)
    @IsOptional()
    price_gt?:number;

    @IsNumber({maxDecimalPlaces:2})
    @Type(()=>Number)
    @IsOptional()
    price_lt?:number;

    @IsInt()
    @IsPositive()
    @Type(()=>Number)
    page:number;

    @IsInt()
    @IsPositive()
    @Type(()=>Number)
    qty_per_page:number;
    
}