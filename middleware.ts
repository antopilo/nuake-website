import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Set hostname from environment variable
  const newUrl = new URL(req.url);
  newUrl.hostname = new URL(process.env.NEXTAUTH_URL!).hostname;

  console.log( newUrl.hostname)
  console.log("MIDDLEWARE replaced hostname to: " + newUrl.hostname);

  // Return the response
  return NextResponse.rewrite(newUrl);
}

// Optionally define your matcher to apply this middleware to specific paths
export const config = {
  matcher: ['/api/auth/callback/ssss', '/protected/:path*'], // Update paths as needed
};