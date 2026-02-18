import { getAllProducts } from '@/lib/server-db';
import type { Product } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getAllProducts({ take: 5 });
  } catch (error) {
    console.error("Failed to load products on home page:", error);
    products = [];
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="text-center space-y-8 py-20 md:py-32 relative overflow-hidden bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent rounded-[3rem] border border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4 animate-bounce-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          New Assets Added Daily
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Digital Assets
          </span>
          <br />
          <span className="text-foreground">Marketplace</span>
        </h1>

        <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
          Premium tools, templates, and resources for the modern creator.
          Instant access to quality you can trust.
        </p>


      </section>

      <div id="products" className="scroll-mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Latest Releases</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-secondary via-transparent to-transparent ml-6 rounded-full" />
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
