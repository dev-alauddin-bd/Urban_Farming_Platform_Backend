import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    console.log('🌱 Seeding database...');

    // 1. Create Admin
    await prisma.user.upsert({
        where: { email: 'admin@urbanfarming.com' },
        update: {},
        create: {
            name: 'System Admin',
            email: 'admin@urbanfarming.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
        },
    });

    // 2. Create Vendors and their profiles
    for (let i = 1; i <= 10; i++) {
        const vendorEmail = `vendor${i}@example.com`;
        const user = await prisma.user.upsert({
            where: { email: vendorEmail },
            update: {},
            create: {
                name: `Vendor ${i}`,
                email: vendorEmail,
                password: hashedPassword,
                role: UserRole.VENDOR,
                status: UserStatus.ACTIVE,
            },
        });

        const vendorProfile = await prisma.vendorProfile.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                farmName: `Green Farm ${i}`,
                farmLocation: `Location ${i}, City`,
                certificationStatus: 'APPROVED',
            },
        });

        // 3. Create 10 products for each vendor (Total 100)
        for (let j = 1; j <= 10; j++) {
            await prisma.produce.create({
                data: {
                    vendorId: vendorProfile.id,
                    name: `Organic ${['Tomato', 'Cucumber', 'Lettuce', 'Carrot', 'Spinach'][Math.floor(Math.random() * 5)]} ${i}-${j}`,
                    description: 'Freshly grown organic produce from our urban farm.',
                    price: Math.floor(Math.random() * 100) + 10,
                    category: ['VEGETABLE', 'FRUIT', 'HERB'][Math.floor(Math.random() * 3)],
                    availableQuantity: Math.floor(Math.random() * 50) + 10,
                    certificationStatus: 'APPROVED',
                },
            });
        }
    }

    // 4. Create a few Customers
    for (let i = 1; i <= 5; i++) {
        const customerEmail = `customer${i}@example.com`;
        await prisma.user.upsert({
            where: { email: customerEmail },
            update: {},
            create: {
                name: `Customer ${i}`,
                email: customerEmail,
                password: hashedPassword,
                role: UserRole.CUSTOMER,
                status: UserStatus.ACTIVE,
            },
        });
    }

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
