import { Controller, HttpCode, Post, HttpStatus, Body, Get, Query } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { ProductQuery } from './query';

@Controller('products')
export class ProductController {
  
  constructor(
    private productService : ProductService
  ){}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(@Query() query : ProductQuery){
    return this.productService.getProducts(query)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@Body() dto : ProductDto) {
    return this.productService.createProduct(dto)
  }

}
