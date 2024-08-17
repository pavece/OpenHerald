/*
  Warnings:

  - Added the required column `color` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "color" TEXT NOT NULL;
