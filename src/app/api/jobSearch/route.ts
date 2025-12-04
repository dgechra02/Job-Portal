import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("get request run");
  const url = req.url;
  const objUrl = new URL(url);
  const searchParams = objUrl.searchParams;
  const employmentType = searchParams.get("employmentType") || "Full-time";
  const jobType = searchParams.get("jobType") || "Remote";
  const minSalary = parseInt(searchParams.get("salary") || "1000");
  const page = parseInt(searchParams.get("page") || "1");
  console.log("page : ", page)
  console.log("employmentType array in api : ", employmentType);

  try {
    const dataArray = await prismaClient.addJob.findMany({
      where: {
        employmentType: {
          contains: employmentType,
        },
        jobType,
        salary: {
          gte: minSalary,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    });
    if(dataArray){
      return NextResponse.json({
        success: true,
        dataArray,
      });
    } else {
      return NextResponse.json({
        success: false,
        meesage : 'something went wrong'
      });
    }
  } catch (error : any) {
    console.log("Error fetching dataArray ", error?.message)
    return NextResponse.json({
      sucess : false, 
      message : "Error fetching dataArray " + error?.message
    })
  }
}