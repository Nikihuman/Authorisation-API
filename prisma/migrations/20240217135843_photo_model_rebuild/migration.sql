/*
  Warnings:

  - You are about to drop the column `createdBy` on the `PhotoModel` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `PhotoModel` table. All the data in the column will be lost.
  - You are about to drop the column `regularUrl` on the `PhotoModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photoId]` on the table `PhotoModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullUrl` to the `PhotoModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `PhotoModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoId` to the `PhotoModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawUrl` to the `PhotoModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `PhotoModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `PhotoModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PhotoModel_imageId_key";

-- AlterTable
ALTER TABLE "PhotoModel" DROP COLUMN "createdBy",
DROP COLUMN "imageId",
DROP COLUMN "regularUrl",
ADD COLUMN     "fullUrl" TEXT NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "photoId" TEXT NOT NULL,
ADD COLUMN     "rawUrl" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PhotoModel_photoId_key" ON "PhotoModel"("photoId");
