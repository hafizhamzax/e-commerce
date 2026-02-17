'use server';

import { cookies } from 'next/headers';
import { encrypt } from './session';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;

    if (password === ADMIN_PASSWORD) {
        const user = { email: 'admin@nexavault.com', role: 'admin' };
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const session = await encrypt({ user, expires });

        const cookieStore = await cookies();
        cookieStore.set('session', session, { expires, httpOnly: true, path: '/' });

        return { success: true };
    } else {
        return { success: false, error: 'Invalid password' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
