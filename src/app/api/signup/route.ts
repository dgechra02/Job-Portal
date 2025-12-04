import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // body in it-self is user Data

  try {
    const user = await prismaClient.user.create({
      data: body,
    });

    if (user) {
      const userTokenData = {
        id: user.id,
      };
      const token = createToken(userTokenData); // this userTokenData must be an object kyuki iat(issuedAT) add hoga is object me
      const userCookies = await cookies();
      userCookies.set("userIdToken", token);

      return NextResponse.json({
        success: true,
        message: "user registered successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err: any) {
    console.error("error in cerating error : ", err.message);
    return NextResponse.json(
      {
        success: false,
        message: "error creating user",
      },
      { status: 500 }
    );
  }
}

// router.push('/') soft redirect - only required things will come
// window.location.href = "/" full page reload
// yah res return hoga, normal redirect('/') execution rok ke yhi se redirect kr deta hai,