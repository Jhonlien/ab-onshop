import { HttpCode, HttpStatus, Injectable, Post, UnprocessableEntityException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ProductIdQuery, ProductQuery } from './query';

@Injectable()
export class ProductService {

  constructor(

    private prisma : PrismaService
    
  ){}

  async getProducts(query : ProductQuery){
    const { page = 1, limit = 100 } = query

    const totalProduct = await this.countProduct()
    const totalPage = Math.ceil(totalProduct / limit)
    const skip = page <= 1 ? 0 : (page - 1) * limit

    const pagination = {
      page, 
      limit,
      total_products : totalProduct,
      total_page : totalPage
    }

    const products  = await this.prisma.product.findMany({
      skip,
      take : limit,
      include : {
        category : true,
        product_stock : true
      }
    })

    return {
      products,
      pagination
    }
  }

  async getProductById(query: ProductIdQuery) {
    const product = await this.prisma.product.findUnique({
      where : {
        id : query.id
      },
      include : {
        category : true,
        product_image : true,
        product_stock : true
      }
    })

    return product
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

  async countProduct() : Promise<number> {
    const count = await this.prisma.product.count({})

    return count
  }

}
