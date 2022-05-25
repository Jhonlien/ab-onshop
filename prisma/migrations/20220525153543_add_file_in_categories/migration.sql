/*
  Warnings:

  - Added the required column `file` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "file" TEXT NOT NULL;
