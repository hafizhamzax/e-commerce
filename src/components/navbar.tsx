'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Settings, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';

const navLinks = [
    { label: 'Home', href: '/', type: 'route' },
    { label: 'About', href: '/about', type: 'route' },
    { label: 'Products', href: '/#products', type: 'scroll' },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleProductsClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
        if (type === 'scroll') {
            e.preventDefault();
            if (pathname === '/') {
                // Already on home page — just scroll
                const el = document.getElementById('products');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to home then scroll (Next.js handles the hash)
                window.location.href = href;
            }
            setMobileOpen(false);
        } else {
            setMobileOpen(false);
        }
    };

    const isActive = (href: string, type: string) => {
        if (type === 'scroll') return false;
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/70 bg-background/90 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-purple-600 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <ShoppingBag size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">NexaVault</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleProductsClick(e, link.href, link.type)}
                            className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                                ${isActive(link.href, link.type)
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                                }`}
                        >
                            {link.label}
                            {isActive(link.href, link.type) && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600 dark:bg-purple-400" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex" asChild>
                        <Link href="/admin">
                            <Settings size={16} />
                            <span className="hidden sm:inline">Admin</span>
                        </Link>
                    </Button>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-border/70 bg-background/95 backdrop-blur-md px-4 py-4 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleProductsClick(e, link.href, link.type)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                                ${isActive(link.href, link.type)
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/admin" className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                        <Settings size={16} />
                        Admin
                    </Link>
                </div>
            )}
        </nav>
    );
}
