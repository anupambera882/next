import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function POST(req: NextRequest) {
  const { name, email, password, city, address, mobile } = await req.json();
  const isExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isExist) {
    return NextResponse.json({
      result: {},
      success: true,
      message: "user already exist",
    });
  }
  const user = await prisma.user.create({
    data: { address, city, email, name, password, mobile },
  });
  return NextResponse.json({
    result: user,
    success: true,
    message: "Registration successful",
  });
}
