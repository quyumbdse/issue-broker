import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest,
    { params }: { params: { id: string } }) {
    
    const user = await prisma.user.findUnique({
        where: {id: params.id}
    })
    return NextResponse.json(user);
};

