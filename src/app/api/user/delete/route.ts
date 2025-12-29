import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
    try {
        const email = "demo@planify.com";

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Delete dependencies first in a transaction
        await prisma.$transaction([
            prisma.booking.deleteMany({ where: { userId: user.id } }),
            prisma.review.deleteMany({ where: { userId: user.id } }),
            prisma.user.delete({ where: { id: user.id } })
        ]);

        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json(
            { error: "Failed to delete account" },
            { status: 500 }
        );
    }
}
