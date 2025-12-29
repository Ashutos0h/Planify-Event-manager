import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        // AUTH MOCK: Get agency "Elite Marriages"
        const agency = await prisma.agency.findFirst({
            where: { name: "Elite Marriages" }
        });

        if (!agency) {
            return NextResponse.json({ error: "Agency not found" }, { status: 404 });
        }

        const bookings = await prisma.booking.findMany({
            where: { agencyId: agency.id },
            include: {
                user: true // Fetch user details to show client name
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching agency bookings:", error);
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
