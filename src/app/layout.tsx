import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import WebSiteSchema from '@/components/seo/WebSiteSchema';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const themeInitScript = `
(() => {
  try {
    const key = 'theme';
    const savedTheme = window.localStorage.getItem(key);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch {
    document.documentElement.classList.add('dark');
  }
})();
`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexavault.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8b5cf6',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NexaVault - Premium Digital Assets Marketplace',
    template: '%s | NexaVault',
  },
  description: 'Discover premium digital assets, templates, and tools for creators. Instant delivery, quality guaranteed.',
  keywords: ['digital products', 'templates', 'creator tools', 'marketplace', 'premium assets', 'design templates', 'developer tools'],
  authors: [{ name: 'NexaVault' }],
  creator: 'NexaVault',
  publisher: 'NexaVault',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'NexaVault',
    title: 'NexaVault - Premium Digital Assets Marketplace',
    description: 'Discover premium digital assets, templates, and tools for creators. Instant delivery, quality guaranteed.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexaVault - Premium Digital Assets Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaVault - Premium Digital Assets Marketplace',
    description: 'Discover premium digital assets, templates, and tools for creators. Instant delivery, quality guaranteed.',
    images: ['/og-image.png'],
    creator: '@nexavault',
  },
  verification: {
    // Add your Google Search Console verification here if you have one
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={cn(inter.variable, 'bg-background font-sans antialiased min-h-screen')}>
        <OrganizationSchema />
        <WebSiteSchema />
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen container mx-auto px-4">
          {children}
        </main>
        <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-white/10">
          <p>&copy; {new Date().getFullYear()} NexaVault. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
