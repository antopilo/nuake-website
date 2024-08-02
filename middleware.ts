import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Set hostname from environment variable
  req.nextUrl.hostname = new URL(process.env.NEXTAUTH_URL!).hostname;

  console.log( req.nextUrl.hostname)
  console.log("MIDDLEWARE");
  // Return the response
  return req;
}

// Optionally define your matcher to apply this middleware to specific paths
export const config = {
  matcher: ['/api/:path*', '/protected/:path*'], // Update paths as needed
};