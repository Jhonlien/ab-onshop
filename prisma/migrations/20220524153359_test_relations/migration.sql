-- DropForeignKey
ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_product_id_fkey";

-- AlterTable
ALTER TABLE "product_stocks" ALTER COLUMN "product_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_stocks" ADD CONSTRAINT "product_stocks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
