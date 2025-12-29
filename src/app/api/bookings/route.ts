
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { agencyId, date, totalAmount, packageType } = body;

        // ... validation ...

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                agencyId,
                date: new Date(date),
                totalAmount,
                packageType: packageType || "CUSTOM",
                status: "PENDING" // Default to PENDING now that we have flows
            }
        });

        console.log("Booking created:", booking);

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}
