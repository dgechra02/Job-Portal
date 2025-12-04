import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const user = await getUserFromCookies();
    // console.log("user in api end : ", user);

    if(!user.success){
        return NextResponse.json({
            success: false, 
            message: user.message
        })
    }
    const userId = user.id ; // userId matched with his owner id, to ye hi eski company hai

    // const company = await prismaClient.company.findUnique({
    //     where : {
    //         companyOwnerId : userId
    //     }
    // })
    // const data = {
    //     ...user, 
    //     company
    // }

    return NextResponse.json({
        success : true, 
        message : "found user",
        data : user
    })
}

// it will read cookies -> jo user login in hai brower me uske bare me pta chal jayegga
    // const userCookies = cookies();

    // // get user email 
    // // console.log("all cookies : ", (await userCookies).getAll)
    // const email = userCookies.get('emailToken')?.value; // 'token' jis naam se save krna hai
    // if(!email){
    //     return NextResponse.json ({
    //         success: false, 
    //         message: "The user is not authenicated"
    //     })
    // }

    // // search database for user using this email 
    // const user = await prismaClient.user.findUnique({
    //     where : {
    //         email
    //     }, 
    //     omit : { // have all information of user except password
    //         password : true
    //     }
    // })