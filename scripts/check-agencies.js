const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.agency.count();
        console.log(`Total Agencies in DB: ${count}`);

        if (count > 0) {
            const agencies = await prisma.agency.findMany({ take: 3 });
            console.log('Sample Agencies:', JSON.stringify(agencies, null, 2));
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
