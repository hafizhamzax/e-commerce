export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string; // Markdown/HTML content
    excerpt: string;
    price: number;
    gumroadLink: string;
    imageUrl: string;
    category: string;
    publishedAt: string;
}

export type ProductInput = Omit<Product, 'id' | 'publishedAt'>;
