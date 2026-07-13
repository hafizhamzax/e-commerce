import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'NexaVault - Premium Digital Assets Marketplace',
        short_name: 'NexaVault',
        description: 'Discover premium digital assets, templates, and tools for creators.',
        start_url: '/',
        display: 'standalone',
        background_color: '#09090b',
        theme_color: '#8b5cf6',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}