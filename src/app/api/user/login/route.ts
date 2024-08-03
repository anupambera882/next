import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({
      result: {},
      message: "restaurant not exist",
      success: false,
    });
  }
  if (user.password !== password) {
    return NextResponse.json({
      result: {},
      message: "invalid credential",
      success: false,
    });
  }

  return NextResponse.json({
    result: user,
    success: true,
    message: "login successful",
  });
}
