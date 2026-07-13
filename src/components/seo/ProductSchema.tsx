import type { Product } from '@/lib/types';

interface ProductSchemaProps {
    product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexavault.com';
    
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": product.title,
                    "description": product.excerpt,
                    "image": product.imageUrl || `${siteUrl}/og-image.png`,
                    "sku": product.id,
                    "offers": {
                        "@type": "Offer",
                        "url": `${siteUrl}/products/${product.slug}`,
                        "priceCurrency": "USD",
                        "price": product.price,
                        "availability": "https://schema.org/InStock",
                        "seller": {
                            "@type": "Organization",
                            "name": "NexaVault",
                        },
                    },
                    "brand": {
                        "@type": "Organization",
                        "name": "NexaVault",
                    },
                    "category": product.category || "DigitalProduct",
                }),
            }}
        />
    );
}