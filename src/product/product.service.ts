import { HttpCode, HttpStatus, Injectable, Post, UnprocessableEntityException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Slug } from 'common/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ProductCategoryQuery, ProductIdQuery, ProductQuery, ProductSlugQuery } from './query';

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
        product_image : true,
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

  async getProductBySlug(query: ProductSlugQuery) {
    const product = await this.prisma.product.findUnique({
      where : {
        slug : query.slug
      },
      include : {
        category : true,
        product_image : true,
        product_stock : true
      }
    })

    return product
  }

  async getProductByCategory(query : ProductCategoryQuery){
    const product = await this.prisma.product.findMany({
      where : {
        category : {
          slug : query.slug
        }
      },
      include : {
        product_image : true,
        product_stock : true,
      }
    })

    return product
  }

  
  async createProduct(data : ProductDto) : Promise<Product> {
    
    try{
      const product = await this.prisma.product.create({
        data  : {
          ...data,
          slug : Slug.convertToSlug(data.name),
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

  async updateProduct(data: ProductDto, query: ProductIdQuery) {

    // const product = await this.prisma.product.update({
    //   where : {
    //     id : query.id
    //   },
    //   data : {
    //     ...data,
    //     product_stock : {
    //       connect : {
    //         id: data.product_stock
    //       }
    //     }
    //   },
    //   include : {
    //     category : true,
    //     product_image  : true,
    //     product_stock : true
    //   }
    // })

    // return product
  }


  async uploadImages(files : {file : Express.Multer.File[]}, productId : ProductIdQuery) {
    files.file.map(async (e, i) => {
      await this.prisma.productImage.create({
        data: {
          productId : productId.id,
          file : e.path
        }
      })
    })

    const products = this.prisma.product.findUnique({
      where : {
        id  : productId.id
      },
      include : {
        product_image : true,
        product_stock : true
      }
    })

    return products
  }

  async deleteProduct(query : ProductIdQuery) {
    const product = await this.prisma.product.delete({
      where : {
        id : query.id,
      },
      include : {
        product_image : true,
        product_stock : true
      }
    })

    return product
  } 

  async countProduct() : Promise<number> {
    const count = await this.prisma.product.count({})

    return count
  }

}
