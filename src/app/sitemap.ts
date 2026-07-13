import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/server-db';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexavault.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getAllProducts();

    const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${siteUrl}/products/${product.slug}`,
        lastModified: product.publishedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        ...productUrls,
    ];
}