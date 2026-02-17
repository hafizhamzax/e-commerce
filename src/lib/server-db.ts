import { db } from '@/lib/db';
import { products as productsTable } from '@/lib/db/schema';
import { Product, ProductInput } from '@/lib/types';
import { desc, eq } from 'drizzle-orm';

export const getAllProducts = async (options?: { take?: number; skip?: number }): Promise<Product[]> => {
    const { take, skip } = options || {};

    try {
        let query = db.select().from(productsTable).orderBy(desc(productsTable.publishedAt));

        if (take !== undefined) {
            // @ts-ignore - drizzle type definition might be strict about chaining dynamic limits
            query = query.limit(take);
        }
        if (skip !== undefined) {
            // @ts-ignore
            query = query.offset(skip);
        }

        const products = await query;

        return products.map(p => ({
            ...p,
            publishedAt: p.publishedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        throw error;
    }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    const product = await db.query.products.findFirst({
        where: eq(productsTable.slug, slug),
    });

    if (!product) return undefined;

    return {
        ...product,
        publishedAt: product.publishedAt.toISOString(),
    };
};

export const createProduct = async (productData: ProductInput): Promise<Product> => {
    if (!productData.title || !productData.gumroadLink) {
        throw new Error("Missing required fields");
    }

    const [product] = await db.insert(productsTable).values({
        ...productData,
    }).returning();

    return {
        ...product,
        publishedAt: product.publishedAt.toISOString(),
    };
};

export const deleteProduct = async (id: string): Promise<void> => {
    await db.delete(productsTable).where(eq(productsTable.id, id));
};
