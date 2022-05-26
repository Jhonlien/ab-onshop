/*
  Warnings:

  - Added the required column `slug` to the `product_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "slug" TEXT NOT NULL;
