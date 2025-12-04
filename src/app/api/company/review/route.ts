import prismaClient from "@/services/prisma";
import { paramsType } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const dataObj = {
    content: body?.content,
    user_id: body?.user_id,
    userName: body?.userName,
    company_id: body?.company_id,
  };
  try {
    const review = await prismaClient.review.create({
      data: dataObj,
    });
    if (review) {
      return NextResponse.json({
        success: true,
        message: "review added",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (error: any) {
    console.log("error while edding a review : ", error?.message);
    return NextResponse.json({
      success: false,
      message: "Error while adding a review " + error?.message,
    });
  }
}