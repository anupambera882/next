import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function POST(req: NextRequest) {
  const { name, email, password, city, address, contactNo } = await req.json();
  const findRestaurant = await prisma.restaurant.findUnique({ where: { email } });
  if (findRestaurant) {
    return NextResponse.json({ message: 'restaurant already exist' });
  }
  const restaurant = await prisma.restaurant.create({ data: { address, city, contactNo, email, name, password } });
  return NextResponse.json({ result: restaurant, success: true, message: 'Registration successful' })
}