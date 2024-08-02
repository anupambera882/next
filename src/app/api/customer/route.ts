import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const location = searchParams.get("location");
  const restaurantName = searchParams.get("restaurant");
  const where: any = {};
  if (location) where["city"] = location;
  if (restaurantName) where["name"] = { startsWith: restaurantName };

  const restaurantList = await prisma.restaurant.findMany({
    where,
  });

  return NextResponse.json({
    result: restaurantList,
    success: true,
    message: "location",
  });
}
