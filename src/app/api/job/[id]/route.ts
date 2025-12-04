import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { paramsType } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : paramsType) {
  const { id } = await params;

  try {
    const job = await prismaClient.openings.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });

    if (job) {
      return NextResponse.json({
        success: true,
        data: job,
        message: "job found",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "no job found",
      });
    }
  } catch (error : any) {
    return NextResponse.json({
      success: false,
      message: "error while adding job details",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params } : paramsType
) {
  const { id } = await params;

  try {
    const jobToDelete = await prismaClient.openings.delete({
      where: {
        id: id,
      },
    });
    if (jobToDelete) {
      return NextResponse.json({
        success: true,
        message: "job deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "unable to delete the job",
      });
    }
  } catch (error : any) {
    return NextResponse.json({
      success: false,
      message: "error while deleting the job : " + error?.message,
    });
  }
}

export async function POST(req: NextRequest, {params} : paramsType) {
    const {id} = await params;
  const body = await req.json();
  try {
    const jobToUpdate = await prismaClient.openings.update({
      where: {
        id: id,
      },
      data : body
    });
    if(jobToUpdate){
        return NextResponse.json({
            success : true, 
            message : "job upadted",
            data : jobToUpdate
        })
    } else {
        return NextResponse.json({
            success : false, 
            message : "something went wrong"
        })
    }
  } catch (error : any) {
    console.log("error updating job", error?.message);
    return NextResponse.json({
      success: false,
      message: "error updating job : " + error?.message,
    });
  }
}