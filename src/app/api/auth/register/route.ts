import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { name, email, password, phone, agencyName, location } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = agencyName ? "AGENCY_OWNER" : "USER";

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone: phone || "",
                role,
                location: location || "",
            }
        });

        // If it's an agency, create the agency record too
        if (role === "AGENCY_OWNER" && agencyName) {
            await prisma.agency.create({
                data: {
                    name: agencyName,
                    location: location || "Unknown",
                    description: "New agency",
                    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop", // Default
                    tags: "General",
                    portfolio: "[]",
                    priceRangeMin: 100000,
                    priceRangeMax: 500000,
                    ownerId: user.id
                }
            });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}
