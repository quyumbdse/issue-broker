import prisma  from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { userSchema } from "@/app/validationSchema";
import { randomUUID } from "crypto";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'

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

    const token = await prisma.userActivateToken.create({
        data: {
            userId: newUser.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        },
    })

    resend.emails.send({
        from: 'onbording@resend.dev',
        to: newUser.email!,
        subject: 'Activate account Request',
        
        text: `Hello ${newUser.name},  There is the link to activate your email, please click here: ${PROTOCOL}://${DOMAIN}/activate/${token.token}

        For security reasons, this link is only valid for four hours.`,
    });
    
    return NextResponse.json({ email: newUser.email });
   
}