import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json().catch(() => ({})); // Handle empty body gracefully
        const status = body.status || 'CANCELLED'; // Default to CANCELLED for backward compatibility if needed, though explicit is better.

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return NextResponse.json(
            { error: "Failed to cancel booking" },
            { status: 500 }
        );
    }
}
