import { Avatar } from '@radix-ui/themes';
// import { UserRole } from '@prisma/client'
// import type { ISODateString, Session, User} from 'next-auth'
// import type { JWT } from 'next-auth/jwt'


// declare module 'next-auth/jwt' {
//     interface JWT {
//         id: string
//         email: string
//         role: UserRole
//     }
// }

// declare module 'next-auth' {
//     interface Session {
//         user: User & {
//             id: UserId
//             email: string
//             name: string
//             role: UserRole
//         }
//     }
// }

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