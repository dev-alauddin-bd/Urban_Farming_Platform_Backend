-- CreateTable
CREATE TABLE "rental_spaces" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_spaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rental_spaces_vendorId_idx" ON "rental_spaces"("vendorId");

-- CreateIndex
CREATE INDEX "rental_spaces_isDeleted_idx" ON "rental_spaces"("isDeleted");

-- AddForeignKey
ALTER TABLE "rental_spaces" ADD CONSTRAINT "rental_spaces_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
