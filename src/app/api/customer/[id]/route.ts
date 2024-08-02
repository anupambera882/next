import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { id: +id },
    select: { id: true, name: true, city: true, address: true, contactNo: true, email: true, Food: true }
  });

  return NextResponse.json({ result: restaurant, success: true, message: 'restaurant details' })
}
