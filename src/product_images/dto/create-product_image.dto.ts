import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductImageDto {

    @IsString()
    @IsNotEmpty()
    product_path_image:string

    @IsInt()
    @IsPositive()
    product_id:number;

}
