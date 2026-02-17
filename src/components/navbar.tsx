import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Settings } from 'lucide-react';
import { getSession } from '@/lib/get-session';

export async function Navbar() {
    const session = await getSession();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <ShoppingBag size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">NexaVault</span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Always show Admin button, but it will be protected by middleware */}
                    <Button variant="ghost" size="sm" className="gap-2" asChild>
                        <Link href="/admin">
                            <Settings size={16} />
                            <span className="hidden sm:inline">Admin</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
