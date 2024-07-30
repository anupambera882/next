import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function POST(req: NextRequest) {
  const { email, password, } = await req.json();
  const restaurant = await prisma.restaurant.findUnique({ where: { email } });
  if (!restaurant) {
    return NextResponse.json({ result: {}, message: 'restaurant not exist', success: false });
  }
  if (restaurant.password !== password) {
    return NextResponse.json({ result: {}, message: 'invalid credential', success: false });
  }

  return NextResponse.json({ result: restaurant, success: true, message: 'login successful' })
}