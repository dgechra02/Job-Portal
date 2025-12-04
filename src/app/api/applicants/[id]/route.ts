import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { paramsType } from "@/types/type";

export async function GET(req : NextRequest , {params} : paramsType) {
    const { id } = await params;
    console.log("job_id, id ::: ", id)

  try {
    const applicants = await prismaClient.application.findMany({
      where : {
        job_id : id
      }, 
      include : {
        user : true
      }
    });
    if (applicants) {
      console.log("applicants : ", applicants);
      return NextResponse.json({
        success: true,
        message: "applicants found",
        data: applicants,
      });
    } else {
        console.log("something went wrong, while finding applicants")
      return NextResponse.json({
        success: false,
        message: "something went wrong, while finding applicants",
      });
    }
  } catch (error : any) {
    console.log("Error while finding applicants " + error?.messaage)
    return NextResponse.json({
      success: false,
      message: "Error while finding applicants " + error?.messaage,
    });
  }
}