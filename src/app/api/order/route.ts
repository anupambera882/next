import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/db";

export async function POST(req: NextRequest) {
  const {
    userId,
    restaurantId,
    foodIds,
    status,
    amount,
  }: {
    userId: number;
    restaurantId: number;
    foodIds: number[];
    status: string;
    amount: string;
  } = await req.json();
  const order = await prisma.order.create({
    data: { amount, status, restaurantId, userId },
  });

  for (const foodId of foodIds) {
    await prisma.orderDetails.create({
      data: { foodId, orderId: order.id },
    });
  }
  return NextResponse.json({
    result: {},
    success: true,
    message: "order",
  });
}
