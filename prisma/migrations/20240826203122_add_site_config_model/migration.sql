-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "navbarCategories" TEXT[],
    "mainPageCategories" TEXT[],

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);
