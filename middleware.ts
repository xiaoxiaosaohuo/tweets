// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// paths that require authentication or authorization
// const needLoginPaths = /\/api(\/.*)?$/;
const userAuthPaths = /^\/$/
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const needAuth = userAuthPaths.test(pathname);

  if (needAuth){
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      const url = new URL(`/auth/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(`${process.env.NEXTAUTH_URL}`));
      return NextResponse.redirect(url);
    }
  }


  return res;
}
