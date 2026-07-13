import { getSession } from '@/lib/get-session';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getSession();
    return NextResponse.json({ isAdmin: session?.user?.role === 'admin' });
}
