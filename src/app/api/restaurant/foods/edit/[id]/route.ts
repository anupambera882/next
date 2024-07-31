import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../libs/db";

export async function GET(
  req: NextRequest, { params: { id } }: { params: { id: string } }
) {
  const food = await prisma.food.findUnique({
    where: { id: +id },
  });

  if (!food) {
    return NextResponse.json({ result: {}, success: false, message: 'Incorrect food id' })
  }
  return NextResponse.json({ result: food, success: true, message: 'food details' })
}

export async function PUT(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const body = await req.json();
  const food = await prisma.food.findUnique({
    where: { id: +id },
  });

  if (!food) {
    return NextResponse.json({ result: {}, success: false, message: 'Incorrect restaurant id' })
  }
  await prisma.food.update({ where: { id: +id }, data: body });
  return NextResponse.json({ result: food, success: true, message: 'food create successfully!' })
}
