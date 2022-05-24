import { HttpCode, HttpStatus, Injectable, Post, UnprocessableEntityException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {

  constructor(

    private prisma : PrismaService
    
  ){}

  async getProducts() : Promise<Product[]>{

    const products  = await this.prisma.product.findMany({
      include : {
        category : true,
        product_stock : true
      }
    })

    return products

  }

  
  async createProduct(data : ProductDto) : Promise<Product> {
    
    try{
      const product = await this.prisma.product.create({
        data  : {
          ...data,
          product_stock : {
            create : data.product_stock
          }
        },
        include : {
          category : true,
          product_stock : true
        }
      })

      return product
      
    } catch (error) {
      console.log(error)
      throw new UnprocessableEntityException(error)
    }
  }

}
