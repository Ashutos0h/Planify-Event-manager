
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json([]);
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: {
                agency: true // Fetch agency details
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
