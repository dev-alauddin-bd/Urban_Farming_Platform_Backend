-- CreateTable
CREATE TABLE "produces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "category" TEXT NOT NULL,
    "availableQuantity" INTEGER NOT NULL,
    "vendorId" TEXT NOT NULL,
    "certificationStatus" "CertificationStatus" NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produces_vendorId_key" ON "produces"("vendorId");

-- CreateIndex
CREATE INDEX "produces_vendorId_idx" ON "produces"("vendorId");

-- CreateIndex
CREATE INDEX "produces_isDeleted_idx" ON "produces"("isDeleted");

-- AddForeignKey
ALTER TABLE "produces" ADD CONSTRAINT "produces_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
