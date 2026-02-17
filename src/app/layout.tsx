import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NexaVault - Your Premium Marketplace',
  description: 'Buy high-quality digital products instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(inter.variable, "bg-background font-sans antialiased min-h-screen")}>
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen container mx-auto px-4">
          {children}
        </main>
        <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border/40">
          <p>
            © {new Date().getFullYear()} NexaVault. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
