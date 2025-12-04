import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { paramsType } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: paramsType) {
  // console.log("params ::: ", params)
  try {
    const { id } = await params;
    // console.log("job id in apply api ", id);

    const data = await getUserFromCookies();

    // console.log("user in apply api end point ", user);

    if (!data?.user) {
      // console.log("user is not authenticated");
      return NextResponse.json({
        success: false,
        message: "user is not authenticated " + data.message,
      });
    }

    const jobData = {
      user_id: data?.user?.id,
      job_id: id,
    };

    // console.log("job application data : ", jobData)

    const applicationData = await prismaClient.application.create({
      data: jobData,
    });

    if (applicationData) {
      // console.log("applicatioonl submmited ");
      return NextResponse.json({
        success: true,
        message: "application submitted",
        data: applicationData,
      });
    } else {
      // console.log("something went wrong, while applying");
      return NextResponse.json({
        success: false,
        message: "something went wrong, while applying",
      });
    }
  } catch (error: any) {
    // console.log("Error while apply job " + error.message);
    return NextResponse.json({
      success: false,
      message: "Error while apply job " + error?.message,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }:  paramsType 
) {
  const { id } = await params;
  const userData = await getUserFromCookies();
  const user = userData?.user;

  try {
    const deleteApply = await prismaClient.application.deleteMany({
      // only delete use nhi kiya kyuki uske liye application key, jisko la sakte hai but extra operation lagenge, esa liye ese easily ke liya
      where: {
        job_id: id,
        user_id: user?.id,
      },
    });
    return customResponse(true, { message: "application removed" });
  } catch (error: any) {
    return customResponse(false, {
      message: "error occured while removing application",
    });
  }
}

function customResponse(success: boolean, data: any) {
  return NextResponse.json({
    success,
    data,
  });
}
