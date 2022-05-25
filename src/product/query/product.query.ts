import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional } from "class-validator";

export class ProductQuery {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page? : number


  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit? : number
}