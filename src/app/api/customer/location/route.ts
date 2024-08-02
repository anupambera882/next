import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/db";

export async function GET(req: NextRequest) {
  const cityList = await prisma.restaurant.findMany({
    distinct: ["city"],
    select: { city: true },
  });

  const values = Array.from(
    new Set<string>(cityList.map(({ city }) => city.toUpperCase()))
  );
  return NextResponse.json({
    result: values,
    success: true,
    message: "location",
  });
}
