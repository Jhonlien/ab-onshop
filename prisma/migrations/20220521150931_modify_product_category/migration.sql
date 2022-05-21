/*
  Warnings:

  - You are about to drop the column `product_id` on the `product_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_product_id_fkey";

-- DropIndex
DROP INDEX "product_categories_product_id_key";

-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_category_id_key" ON "products"("category_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
