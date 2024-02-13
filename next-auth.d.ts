import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string
            image: string,
            email: string,
            role: UserRole,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: UserRole,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: UserRole,
    }
}

// import NextAuth from "next-auth";
// import { User } from "@prisma/client";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string,
//             name: string
//             image: string,
//             email: string,
//             role: UserRole,
//         } & DefaultSession
//     }
// }


// declare module "next-auth/jwt" {
//     interface JWT extends DefaultJWT {
//         role: UserRole,
//     }
// }