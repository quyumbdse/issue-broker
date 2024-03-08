//Ref: https:/ / next - auth.js.org / configuration / nextjs#advanced - usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
         // console.log(request.nextUrl.pathname)
        // console.log("token" + request.nextauth.token?.role)

        if (request.nextUrl.pathname.startsWith("/issues/new")
            && request.nextauth.token?.role !== "USER"
            && request.nextauth.token?.role !== "ADMIN") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/admin")
            && request.nextauth.token?.role !== "ADMIN") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
);

export const config = {
    matcher: [
        '/admin',
        '/issues/new'
    ]
}