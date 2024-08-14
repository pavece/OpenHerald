-- CreateTable
CREATE TABLE "Advertisment" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "destinationUrl" TEXT NOT NULL,
    "mediaLink" TEXT NOT NULL,

    CONSTRAINT "Advertisment_pkey" PRIMARY KEY ("id")
);
