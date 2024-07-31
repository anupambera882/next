import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/db";

export async function GET(req: NextRequest) {
  const food = await prisma.restaurant.findMany({
    distinct: ['city'],
    select: { city: true }
  });
  return NextResponse.json({ result: food, success: true, message: 'food create successfully!' })
}
