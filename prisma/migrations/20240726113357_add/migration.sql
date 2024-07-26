-- CreateEnum
CREATE TYPE "ArticleVerticalAds" AS ENUM ('NONE', 'LEFT', 'RIGHT');

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "readingTime" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "showAds" BOOLEAN NOT NULL DEFAULT true,
    "verticalAds" "ArticleVerticalAds" NOT NULL DEFAULT 'RIGHT',
    "horizontalAds" BOOLEAN NOT NULL DEFAULT true,
    "visibleForUsers" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
