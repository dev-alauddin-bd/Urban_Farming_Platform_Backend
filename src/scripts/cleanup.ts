import { prisma } from "../lib/prisma.js";

async function cleanup() {
  try {
    // 🔥 Child tables first
    await prisma.order.deleteMany({});
    await prisma.produce.deleteMany({});
    await prisma.rentalSpace.deleteMany({});
    await prisma.communityPost.deleteMany({});
    await prisma.plant.deleteMany({});
    await prisma.sustainabilityCert.deleteMany({});
    await prisma.vendorProfile.deleteMany({});

    // 🔥 Parent last
    await prisma.user.deleteMany({});

    console.log("✅ Database cleaned successfully");
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();