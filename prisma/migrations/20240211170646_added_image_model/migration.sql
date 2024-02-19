-- CreateTable
CREATE TABLE "ImageModel" (
    "id" SERIAL NOT NULL,
    "smallUrl" TEXT NOT NULL,
    "regularUrl" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ImageModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
