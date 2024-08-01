-- CreateTable
CREATE TABLE "RegisterAuthorization" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "googleEmail" TEXT,
    "validUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegisterAuthorization_pkey" PRIMARY KEY ("id")
);
