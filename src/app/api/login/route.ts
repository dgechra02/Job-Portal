import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userData = await req.json();
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: userData.email,
        password: userData.password,
      },
    });

    if (user) {
      //   console.log("User logged in successfully");
      const userTokenData = {
        id: user.id,
      };
      const token = createToken(userTokenData);
      const userCookies = await cookies();  
      userCookies.set("userIdToken", token);

      return NextResponse.json({
        success: true,
        message: "User logged in successfuly",
      });
    } else {
      //   console.log("Incorrect email or password");
      return NextResponse.json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    // const userCookies = await cookies();
    // userCookies.set("emailToken", userData.email);
  } catch (error: any) {
    // console.log("Error adding user : ", error?.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
}
