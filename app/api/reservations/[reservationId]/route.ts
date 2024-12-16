import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
  request: Request, 
  { params }: { params: { reservationId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Allow deletion by either the person who made the reservation or the listing owner
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } }
        ]
      }
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('DELETE /api/reservations/[reservationId]:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 