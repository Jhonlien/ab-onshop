import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService 
extends PrismaClient 
implements OnModuleInit, OnModuleDestroy {

  constructor(){
    super({
      datasources : {
        db: {
          url : "postgres://postgres:root@localhost:5432/ab_onshop?schema=public"
        }
      }
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

}
