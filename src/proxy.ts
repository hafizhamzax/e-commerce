import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    // In Next.js 16, proxy is for routing only.
    // Authentication is handled at the page/data layer.
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
