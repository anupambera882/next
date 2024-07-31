import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../libs/db";

export async function GET(req: NextApiRequest, { params: { id } }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: +id },
    select: { Food: true }
  });

  if (!restaurant) {
    return NextResponse.json({ result: {}, success: false, message: 'Incorrect restaurant id' })
  }
  return NextResponse.json({ result: restaurant.Food, success: true, message: 'food create successfully!' })
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const food = await prisma.food.findUnique({
    where: { id: +id },
  });

  if (!food) {
    return NextResponse.json({ result: {}, success: false, message: 'Incorrect food id' })
  }
  await prisma.food.delete({ where: { id: +id } });
  return NextResponse.json({ result: food, success: true, message: 'food delete successfully!' })
}
