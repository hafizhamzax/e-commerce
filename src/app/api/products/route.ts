import { NextResponse } from 'next/server';
import { getAllProducts, createProduct, getProductBySlug } from '@/lib/server-db';
import { ProductInput } from '@/lib/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const product = await getProductBySlug(slug);
            if (!product) {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json(product);
        }

        const products = await getAllProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newProduct = await createProduct(body as ProductInput);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
