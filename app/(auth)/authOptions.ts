import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions  } from "next-auth";
import bcrypt from 'bcrypt';
import { UserRole } from "@prisma/client";
import { useState } from "react";

const authOptions: NextAuthOptions = {
   
    adapter: PrismaAdapter(prisma),

    pages: {
        signIn: '/sign-in'
    },
    providers: [
        GoogleProvider({
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name}${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: UserRole.USER,
                    
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        GitHubProvider({
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: UserRole.USER,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),

        CredentialsProvider({
            
            name: "Credentials",
           
            credentials: {
                email: { label: "email", type: "email", placeholder: "your Email" },
                password: { label: "Password", type: "password", placeholder: "your Password" },
            },
            
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password)
                    return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) return null;
              
                    if (!user.emailVerified) {
                    throw new Error('user need to activate email')
                }
                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword!
                );

                return passwordsMatch ? user : null;
            },
        }),
    ],
    
    callbacks: {
        async jwt({ token, user, session}) {
            if (user)
                return {
                    ...token,
                    id: user.id,
                    role: user.role
                }
            return token;
        },
        
        // way to put property into the session (db to jwt token to  session)
        async session({ session, token, user }) {
            if (session?.user) return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
            return session
        },
    },

    session: {
        strategy: 'jwt'
    }
};
export default authOptions;