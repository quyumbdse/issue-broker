import { title } from 'process';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { date, z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(36535)
})

export async function POST(request: NextRequest) {
    
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(newIssue, { status: 201 });
};