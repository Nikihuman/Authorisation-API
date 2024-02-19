/*
  Warnings:

  - You are about to drop the `ImageModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageModel" DROP CONSTRAINT "ImageModel_userEmail_fkey";

-- DropTable
DROP TABLE "ImageModel";

-- CreateTable
CREATE TABLE "PhotoModel" (
    "id" SERIAL NOT NULL,
    "smallUrl" TEXT NOT NULL,
    "regularUrl" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "PhotoModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhotoModel_imageId_key" ON "PhotoModel"("imageId");

-- AddForeignKey
ALTER TABLE "PhotoModel" ADD CONSTRAINT "PhotoModel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "UserModel"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
