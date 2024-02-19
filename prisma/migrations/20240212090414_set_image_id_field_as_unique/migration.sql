/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `ImageModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImageModel_imageId_key" ON "ImageModel"("imageId");
