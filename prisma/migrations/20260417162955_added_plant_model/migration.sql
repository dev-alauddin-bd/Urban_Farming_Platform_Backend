-- CreateTable
CREATE TABLE "plants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT,
    "plantingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedHarvest" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'GROWING',
    "healthStatus" TEXT NOT NULL DEFAULT 'HEALTHY',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plants_userId_idx" ON "plants"("userId");

-- CreateIndex
CREATE INDEX "plants_isDeleted_idx" ON "plants"("isDeleted");

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
