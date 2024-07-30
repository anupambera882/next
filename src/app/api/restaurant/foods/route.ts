import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function POST(
  req: NextRequest,
) {
  const { name, price, path, description, restaurantId } = await req.json();
  const food = await prisma.food.create({
    data: {
      name,
      price,
      path,
      description,
      restaurantId: +restaurantId
    }
  });
  return NextResponse.json({ result: food, success: true, message: 'food create successfully!' })
}