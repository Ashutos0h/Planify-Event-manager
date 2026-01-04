
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { agency: true }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        let conversations;

        if (user.role === "AGENCY_OWNER" && user.agency) {
            // Fetch conversations where this agency is the participant
            conversations = await prisma.conversation.findMany({
                where: { agencyId: user.agency.id },
                include: {
                    user: { select: { name: true } }, // The Other Party (User)
                    messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    }
                },
                orderBy: { updatedAt: 'desc' }
            });
        } else {
            // Fetch conversations where this user is the participant
            conversations = await prisma.conversation.findMany({
                where: { userId: user.id },
                include: {
                    agency: { select: { name: true, imageUrl: true } }, // The Other Party (Agency)
                    messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    }
                },
                orderBy: { updatedAt: 'desc' }
            });
        }

        return NextResponse.json(conversations);

    } catch (error) {
        console.error("Error fetching conversations:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { agencyId } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Check if conversation exists
        let conversation = await prisma.conversation.findUnique({
            where: {
                userId_agencyId: {
                    userId: user.id,
                    agencyId: agencyId
                }
            }
        });

        // Create if not exists
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    userId: user.id,
                    agencyId: agencyId
                }
            });
        }

        return NextResponse.json(conversation);

    } catch (error) {
        console.error("Error creating conversation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
