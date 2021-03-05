-- CreateEnum
CREATE TYPE "conditions" AS ENUM ('G', 'VG', 'F', 'VF', 'XF', 'UNC');

-- CreateTable
CREATE TABLE "coins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "coinId" TEXT NOT NULL,
    "condition" "conditions" NOT NULL DEFAULT E'UNC',
    "currencyId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coins.url_unique" ON "coins"("url");

-- CreateIndex
CREATE UNIQUE INDEX "countries.code_unique" ON "countries"("code");

-- AddForeignKey
ALTER TABLE "coins" ADD FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
