import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ProductStockDto {
  @IsString()
  @IsNotEmpty()
  color : string
  

  @IsString()
  @IsNotEmpty()
  size : string
  
  @IsNumber()
  @IsNotEmpty()
  stock : string


  @IsUUID()
  @IsNotEmpty()
  product_id : string

}