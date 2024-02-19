/*
  Warnings:

  - You are about to drop the column `userId` on the `ImageModel` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `ImageModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImageModel" DROP CONSTRAINT "ImageModel_userId_fkey";

-- AlterTable
ALTER TABLE "ImageModel" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "UserModel"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
