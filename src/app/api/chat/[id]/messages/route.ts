
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

// GET Messages
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Correct type for dynamic routes in Next.js 15+
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: conversationId } = await params;

        const messages = await prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'desc' }, // Newest first
            take: 50
        });

        // Reverse to show oldest first in UI
        return NextResponse.json(messages.reverse());

    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST Message
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: conversationId } = await params;
        const body = await request.json();
        const { content } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { agency: true }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Determine Sender
        // If user is Agency Owner AND the message is for a conversation involving their agency -> They are sending as AGENCY
        // Otherwise -> They are sending as USER

        let senderId = user.id;
        let senderRole = "USER";

        if (user.role === "AGENCY_OWNER" && user.agency) {
            const conversation = await prisma.conversation.findUnique({
                where: { id: conversationId }
            });

            if (conversation && conversation.agencyId === user.agency.id) {
                senderRole = "AGENCY";
                senderId = user.agency.id; // Or user.id, but visually we might want to distinguish. Let's keep ID as User ID for auth but Role as AGENCY.
                // Actually, schema says senderId is String. Let's send User ID but tag Role as AGENCY.
                senderId = user.id;
            }
        }

        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId,
                senderRole,
                content,
                read: false
            }
        });

        // Update Conversation timestamp
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return NextResponse.json(message);

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
