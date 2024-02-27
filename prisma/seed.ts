import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'supertradeaps@gmail.com' },
        update: {},
        create: {
            email: 'supertradeaps@gmail.com',
            name: 'Admin',
            role: UserRole.ADMIN,
            emailVerified: true,
            hashedPassword: `$2a$09$BE6sb/bFNO6Wtem6SDoo9u.zHIMWDC7fyXGALDPDytSCTd0zsgBTS`,
        },
    })
    console.log({ user })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });