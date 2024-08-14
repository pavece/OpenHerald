/*
  Warnings:

  - You are about to drop the `Advertisment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Advertisment";

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "destinationUrl" TEXT NOT NULL,
    "mediaLink" TEXT NOT NULL,
    "vertical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("id")
);
