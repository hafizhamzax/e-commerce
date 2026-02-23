import { getAllProducts } from '@/lib/server-db';
import type { Product } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { HeroExploreButton } from '@/components/HeroExploreButton';

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
      <section className="text-center space-y-8 py-20 md:py-32 relative overflow-hidden bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent rounded-[3rem] border border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4 animate-bounce">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          New Assets Added Daily
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
            Digital Assets
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">Marketplace</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
          Premium tools, templates, and resources for the modern creator.
          Instant access to quality you can trust.
        </p>

        {/* Scroll-to-products button */}
        <HeroExploreButton />
      </section>

      <div id="products" className="scroll-mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Latest Releases</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-purple-500/40 via-transparent to-transparent ml-6 rounded-full" />
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
