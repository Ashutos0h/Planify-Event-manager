import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "AGENCY_OWNER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Find agency owned by this user
        const agency = await prisma.agency.findUnique({
            where: { ownerId: session.user.id }
        });

        if (!agency) {
            return NextResponse.json({ error: "Agency not found" }, { status: 404 });
        }

        return NextResponse.json(agency);
    } catch (error) {
        console.error("Error fetching agency profile:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "AGENCY_OWNER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, location, description, priceRangeMin, priceRangeMax, portfolio, tags } = body;

        const updatedAgency = await prisma.agency.update({
            where: { ownerId: session.user.id },
            data: {
                name,
                location,
                description,
                priceRangeMin: parseInt(priceRangeMin),
                priceRangeMax: parseInt(priceRangeMax),
                portfolio: JSON.stringify(portfolio), // Store as stringified JSON
                tags
            }
        });

        return NextResponse.json(updatedAgency);
    } catch (error) {
        console.error("Error updating agency profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
