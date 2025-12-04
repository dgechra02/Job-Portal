import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await prismaClient.openings.findMany({
        include : {
            company : true
        }
    });
    return NextResponse.json({
      success: true,
      message: "openings came",
      data: data,
    });
  } catch {
    console.log("error finding openings");
    return NextResponse.json({
      success: false,
      message: "error in finding openings",
    });
  }
}

export async function POST(req: NextRequest) {
  const userData = await getUserFromCookies();
  if(!userData?.user){
    return NextResponse.json({
      success: false,
      message: userData?.message,
    });
  }
  const user = userData?.user
  const body = await req.json();
  const dataToSave = {
    ...body,
    company_id: user?.company?.id,
    // fronted se mat kro, it is not secure, vha se koi bhi kisi bhi company id dal ke job save kr sakta hai
    // but yha pe usi company ki id save kr rhe hai
  };

  try {
    const data = await prismaClient.openings.create({
      data: dataToSave,
    });

    return NextResponse.json({
      success: true,
      message: "openings set ho gayi",
      data: data,
    });
  } catch (error : any) {
    console.log("error message : ");
    return NextResponse.json({
      success: false,
      message: "error in setting opneings",
    });
  }
}