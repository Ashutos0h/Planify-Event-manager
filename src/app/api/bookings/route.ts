
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
        const { agencyId, date, totalAmount, packageType, eventType } = body;

        if (!agencyId || !date || totalAmount === undefined || totalAmount === null) {
            return NextResponse.json(
                { message: "Missing required booking details (agencyId, date, totalAmount)" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const bookingDate = new Date(date);
        const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999));

        // Use interactive transaction to prevent race conditions
        const booking = await prisma.$transaction(async (tx) => {
            // 1. Check for existing bookings on the same day (Double-Booking Defense)
            const existingBooking = await tx.booking.findFirst({
                where: {
                    agencyId,
                    date: {
                        gte: startOfDay,
                        lte: endOfDay
                    },
                    status: {
                        not: "CANCELLED"
                    }
                }
            });

            if (existingBooking) {
                throw new Error("AGENCY_UNAVAILABLE");
            }

            // 2. Create the booking if clear
            return await tx.booking.create({
                data: {
                    userId: user.id,
                    agencyId,
                    date: new Date(date), // Original timestamp
                    totalAmount,
                    packageType: packageType || "CUSTOM",
                    eventType: eventType || "Other",
                    status: "PENDING"
                }
            });
        });

        return NextResponse.json(booking);
    } catch (error: any) {
        console.error("Error creating booking:", error);

        if (error.message === "AGENCY_UNAVAILABLE") {
            return NextResponse.json(
                { error: "This agency is already booked for the selected date." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}
