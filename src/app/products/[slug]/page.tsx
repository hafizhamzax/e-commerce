import { getProductBySlug, getAllProducts } from '@/lib/server-db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatCurrency } from '@/lib/utils';
import { Metadata } from 'next';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.title} - NexaVault`,
        description: product.excerpt,
    };
}

export default async function ProductPage(props: ProductPageProps) {
    const params = await props.params;
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in duration-500 overflow-x-hidden">
            <Link href="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 text-sm transition-colors group font-medium">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column: Image & Quick Stats */}
                <div className="space-y-8 sticky top-24 h-fit">
                    <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-border/50 bg-gray-100 dark:bg-muted group">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-secondary text-gray-500 dark:text-secondary-foreground font-medium">No Preview Available</div>
                        )}
                    </div>

                    {/* Price + Buy card */}
                    <div className="bg-white dark:bg-[#0d0d12] p-8 rounded-2xl border border-gray-200 dark:border-white/[0.08] space-y-6 shadow-lg">
                        <div className="flex justify-between items-end border-b border-gray-100 dark:border-white/10 pb-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest">Price</p>
                                <p className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter">{formatCurrency(product.price)}</p>
                            </div>
                        </div>

                        <a href={product.gumroadLink} target="_blank" rel="noopener noreferrer" className="block transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <Button size="lg" className="w-full text-lg font-bold py-8 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all rounded-xl border-none">
                                Buy Now via Gumroad
                                <ShoppingCart className="ml-3 h-6 w-6" />
                            </Button>
                        </a>

                        <div className="space-y-3 pt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2 font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Instant Digital Delivery
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="space-y-10 overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-border/40 pb-8">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-700 dark:text-purple-400 uppercase bg-purple-100 dark:bg-purple-500/10 rounded-full">
                            {product.category || 'Digital Asset'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white break-words">{product.title}</h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light break-words">{product.excerpt}</p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert prose-lg max-w-none break-words
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-loose
                prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:underline-offset-4 hover:prose-a:text-purple-700
                prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-white/10
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                prose-code:text-purple-700 dark:prose-code:text-purple-400 prose-code:bg-purple-50 dark:prose-code:bg-purple-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-50 dark:prose-pre:bg-black/40 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10 overflow-x-hidden">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
