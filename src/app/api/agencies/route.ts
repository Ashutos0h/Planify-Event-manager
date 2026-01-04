
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        // basic fetch for now, can add server-side filtering later if client-side is too slow
        // For MVP with < 100 agencies, client side filtering is fine, but let's return all.

        const agencies = await prisma.agency.findMany({
            orderBy: {
                rating: 'desc'
            }
        });

        // Parse the tags and portfolio (stored as strings in SQLite) back to arrays/JSON
        const formattedAgencies = agencies.map(agency => {
            let portfolio = [];
            try {
                portfolio = JSON.parse(agency.portfolio);
                if (!Array.isArray(portfolio)) portfolio = [];
            } catch (e) {
                portfolio = [];
            }
            return {
                ...agency,
                tags: agency.tags ? agency.tags.split(',') : [],
                portfolio
            };
        });

        return NextResponse.json(formattedAgencies);
    } catch (error) {
        console.error("Error fetching agencies:", error);
        return NextResponse.json(
            { error: "Failed to fetch agencies" },
            { status: 500 }
        );
    }
}
