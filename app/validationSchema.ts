import { Status, UserRole } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(36535),
    createdById: z.string().min(1).max(255)
});

export const patchIssueSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(255)
        .optional(),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(36535)
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, 'AssignedToUserId is required')
        .max(255)
        .optional()
        .nullable(),
    status: z
        .enum([Status.CLOSED, Status.IN_PROGRESS, Status.OPEN])
        .optional(),
    createdById: z.string().optional(),
    
});

export const userSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().min(1, 'Email is required').max(255),
    role: z.enum([UserRole.USER, UserRole.ADMIN, UserRole.MANAGER]).optional(),
    image: z.string().min(1).max(255).optional(),
    emailVerified: z.string().min(1).max(255).optional(),
});