import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const uploadthingApi = new UTApi()

export async function POST(req: Request) {
    const {userId} = auth()

    if(!userId) return new NextResponse('Unauthorized', {status: 401})
    
    const {imageKey} = await req.json() 

    try {
        const res = await uploadthingApi.deleteFiles(imageKey)
        return NextResponse.json(res)
    } catch(error) {
        console.log('error at uploadthing/delete: ', error)
        return new NextResponse('Internal Server Error', {status: 500})
    }
}