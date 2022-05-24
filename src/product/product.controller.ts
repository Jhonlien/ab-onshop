import { Controller, HttpCode, Post, HttpStatus, Body, Get } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  
  constructor(
    private productService : ProductService
  ){}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(){
    return this.productService.getProducts()
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@Body() dto : ProductDto) {
    return this.productService.createProduct(dto)
  }

}
