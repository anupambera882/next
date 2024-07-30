import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "../../../../../../libs/db";

export async function GET(req: NextApiRequest, { params: { restaurantId } }: { params: { restaurantId: string } },
) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: +restaurantId },
    select: { Food: true }
  });

  if (!restaurant) {
    return NextResponse.json({ result: {}, success: false, message: 'Incorrect restaurant id' })
  }
  return NextResponse.json({ result: restaurant.Food, success: true, message: 'food create successfully!' })
}