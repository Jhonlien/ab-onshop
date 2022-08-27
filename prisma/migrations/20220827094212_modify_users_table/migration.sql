/*
  Warnings:

  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "phone",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
