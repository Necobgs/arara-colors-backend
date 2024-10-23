import { IsInt, IsPositive } from "class-validator";

export class CreateFavoriteDto {
    
    @IsInt()
    @IsPositive()
    product_id:number;    

}
