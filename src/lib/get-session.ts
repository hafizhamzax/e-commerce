import { cookies } from 'next/headers';
import { decrypt } from './session';

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        if (!session) return null;
        return await decrypt(session);
    } catch (error) {
        return null;
    }
}
