export default function OrganizationSchema() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexavault.com';
    
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "NexaVault",
                    "alternateName": "NexaVault Marketplace",
                    "url": siteUrl,
                    "logo": `${siteUrl}/icon.svg`,
                    "sameAs": [
                        // Add your social media URLs here
                        // "https://twitter.com/nexavault",
                        // "https://instagram.com/nexavault",
                    ],
                    "description": "NexaVault is a premium marketplace for digital assets, templates, and tools for creators.",
                    "foundingDate": "2024",
                }),
            }}
        />
    );
}