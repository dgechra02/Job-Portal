import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userData = await getUserFromCookies();
  if (!userData?.user) {
    return NextResponse.json({
      success: false,
      message: userData?.message,
    });
  }
  const user = userData?.user;
  try {
    const jobs = await prismaClient.openings.findMany({
      where: {
        company_id: user?.company?.id,
      },
    });
    if (jobs) {
      return NextResponse.json({
        success: true,
        message: "openings found",
        data: jobs,
      });
    }
  } catch (error : any) {
    console.log("error in finding openings : ", error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}