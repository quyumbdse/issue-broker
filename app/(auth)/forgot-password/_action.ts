'use server'

import prisma from '@/prisma/client'
import { randomUUID } from 'crypto'
import { Resend } from 'resend'
import * as z from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
});

export async function resetPassword(data: z.infer<typeof FormSchema>) {
    const email = data.email
    if (!email || typeof email !== 'string') {
        return {
            error: 'Invalid email',
        }
    }

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        return {
            error: 'This email is not registered',
        }
    }

    const token = await prisma.passwordResetToken.create({
        data: {
            userId: user.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        },
    })

    resend.emails.send({
        from: 'onbording@resend.dev',
        to: user.email!,
        subject: 'Reset Password Request',
        text: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: ${PROTOCOL}://${DOMAIN}/password-reset/${token.token}

        For security reasons, this link is only valid for four hours.
    
       If you did not request this reset, please ignore this email.`,
    });
}