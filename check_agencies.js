
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const agencies = await prisma.agency.findMany();
        console.log(`Found ${agencies.length} agencies.`);
        if (agencies.length > 0) {
            console.log("First agency:", JSON.stringify(agencies[0], null, 2));
        }
    } catch (e) {
        console.error("Error connecting to DB:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
