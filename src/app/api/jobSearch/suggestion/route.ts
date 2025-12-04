import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const sp = req.nextUrl.searchParams; 
    const q = sp.get('q');

    if(!q){
        return NextResponse.json({
            success: false, 
            messaage : 'provide the query',
            suggestions : []
        })
    }
    const sugg = await prismaClient.openings.findMany({
        where : {
            title : {
                contains : q, 
                mode : 'insensitive'
            }
        }, 
        select : {
            id: true, 
            title : true
        },
        take: 10,
    })

    return NextResponse.json({
        success : true, 
        message : 'suggestions came',
        sugg
    })
}