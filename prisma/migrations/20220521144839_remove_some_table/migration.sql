/*
  Warnings:

  - You are about to drop the column `product_color_id` on the `product_stocks` table. All the data in the column will be lost.
  - You are about to drop the column `product_size_id` on the `product_stocks` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_sizes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `product_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `product_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_colors" DROP CONSTRAINT "product_colors_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_sizes" DROP CONSTRAINT "product_sizes_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_product_color_id_fkey";

-- DropForeignKey
ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_product_size_id_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "product_stocks" DROP COLUMN "product_color_id",
DROP COLUMN "product_size_id",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "phone" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "product_colors";

-- DropTable
DROP TABLE "product_sizes";

-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_product_id_key" ON "product_categories"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
