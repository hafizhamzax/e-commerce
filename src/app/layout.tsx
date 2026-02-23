import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={cn(inter.variable, 'bg-background font-sans antialiased min-h-screen')}>
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
