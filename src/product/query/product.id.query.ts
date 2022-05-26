import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class ProductIdQuery {
  @IsUUID()
  @IsNotEmpty()
  id : string
}


export class ProductSlugQuery {
  @IsString()
  @IsNotEmpty()
  slug : string
}

export class ProductCategoryQuery {
  @IsString()
  @IsNotEmpty()
  slug : string
}