'use server';

import { getAllProducts, deleteProduct } from '@/lib/server-db';
import { getSession } from '@/lib/get-session';
import { revalidatePath } from 'next/cache';

export async function fetchProductsAction(offset: number, limit: number) {
    return await getAllProducts({ skip: offset, take: limit });
}

export async function deleteProductAction(id: string) {
    const session = await getSession();
    if (!session) {
        throw new Error("Unauthorized access. Admin only.");
    }

    await deleteProduct(id);
    revalidatePath('/');
    revalidatePath('/admin');
}
