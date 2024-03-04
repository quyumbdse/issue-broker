'use server'

import prisma from '@/prisma/client'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'
import * as z from 'zod';

const FormSchema = z.object({
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
});

export async function resetPassword(token: string, data: z.infer<typeof FormSchema>) {
    const password = data.password
    const confirmPassword = data.confirmPassword
    if (
        !password ||
        typeof password !== 'string' ||
        password !== confirmPassword
    ) {
        return {
            error:
                'The passwords did not match. Please try retyping them and submitting again.',
        }
    }

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
        where: {
            token,
            createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
            resetAt: null,
        },
    })

    if (!passwordResetToken) {
        return {
            error:
                'Invalid token reset request. Please try resetting your password again.',
        }
    }

    const encrypted = await hash(password, 12)

    const updateUser = prisma.user.update({
        where: { id: passwordResetToken.userId },
        data: {
            hashedPassword: encrypted,
        },
    })

    const updateToken = prisma.passwordResetToken.update({
        where: {
            id: passwordResetToken.id,
        },
        data: {
            resetAt: new Date(),
        },
    })

    try {
        await prisma.$transaction([updateUser, updateToken])
    } catch (err) {
        console.error(err)
        return {
            error: `An unexpected error occured. Please try again and if the problem persists, contact support.`,
        }
    }
    // redirect('/password-reset/success')
}