import prisma  from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { userSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = userSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {
            status: 400,
        });

    const user = await prisma.user.findUnique({
        where: { email: body.email },
    });

    if (user)
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
        );

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email, name: body.name, role: body.role,
            hashedPassword
        }
    });

    return NextResponse.json({ email: newUser.email });
}