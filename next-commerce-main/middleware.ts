import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth(function middleware(req: NextRequest & { auth: unknown }) {
  const { pathname } = req.nextUrl
  const session = (req as { auth?: { user?: { role?: string } } }).auth

  // Protect /admin routes — admin only
  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/admin", req.url))
    }
    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // Protect /account routes — any authenticated user
  if (pathname.startsWith("/account")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
}

