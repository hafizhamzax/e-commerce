export default function WebSiteSchema() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexavault.com';
    
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "NexaVault",
                    "url": siteUrl,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string",
                    },
                }),
            }}
        />
    );
}