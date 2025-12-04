import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await getUserFromCookies();

  if (!data?.user) {
    return NextResponse.json({
      success: false,
      message: data?.message,
    });
  }

  const body = await req.json();

  const company = {
    companyName: body.name,
    companyDescription: body.desc,
    companyOwnerId: data?.user.id,
  };

  try {
    const newCompany = await prismaClient.company.create({
      data: company,
    });
    return NextResponse.json({
      success: true,
      data: newCompany,
      message: "company added successfully",
    });
  } catch (err : any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "error while adding company",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const companies = await prismaClient.company.findMany({
      include : {
        owner : true
      }
    });
    return NextResponse.json({
      success: true,
      data: companies,
      message: "companies fetched",
    });
  } catch (error : any) {
    console.error("error while fetching companies : ", error.messaage);
    return NextResponse.json({
      success: false,
      message: "error while fetching companies",
    });
  }
}