-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'PENDING';

-- CreateTable
CREATE TABLE "vendor_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "farmLocation" TEXT NOT NULL,
    "certificationStatus" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vendor_profiles_userId_key" ON "vendor_profiles"("userId");

-- CreateIndex
CREATE INDEX "vendor_profiles_userId_idx" ON "vendor_profiles"("userId");

-- CreateIndex
CREATE INDEX "vendor_profiles_farmName_idx" ON "vendor_profiles"("farmName");

-- CreateIndex
CREATE INDEX "vendor_profiles_farmLocation_idx" ON "vendor_profiles"("farmLocation");

-- CreateIndex
CREATE INDEX "vendor_profiles_certificationStatus_idx" ON "vendor_profiles"("certificationStatus");

-- CreateIndex
CREATE INDEX "vendor_profiles_isDeleted_idx" ON "vendor_profiles"("isDeleted");

-- AddForeignKey
ALTER TABLE "vendor_profiles" ADD CONSTRAINT "vendor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
