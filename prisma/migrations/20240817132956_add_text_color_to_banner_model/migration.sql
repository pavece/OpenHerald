/*
  Warnings:

  - You are about to drop the column `color` on the `Banner` table. All the data in the column will be lost.
  - Added the required column `bgColor` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "color",
ADD COLUMN     "bgColor" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL;
