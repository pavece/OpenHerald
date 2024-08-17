-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "showIcon" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
