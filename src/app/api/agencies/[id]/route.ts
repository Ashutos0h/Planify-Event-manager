
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const agency = await prisma.agency.findUnique({
            where: { id },
        });

        if (!agency) {
            return NextResponse.json(
                { error: "Agency not found" },
                { status: 404 }
            );
        }

        const formattedAgency = {
            ...agency,
            tags: agency.tags.split(','),
            portfolio: JSON.parse(agency.portfolio) as string[]
        };

        return NextResponse.json(formattedAgency);
    } catch (error) {
        console.error("Error fetching agency:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
