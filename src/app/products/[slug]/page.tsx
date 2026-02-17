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
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column: Image & Quick Stats */}
                <div className="space-y-8 sticky top-24 h-fit">
                    <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-muted group">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground font-medium">No Preview Available</div>
                        )}
                    </div>

                    <div className="bg-card/50 glass p-8 rounded-xl border border-border/50 space-y-6 shadow-xl backdrop-blur-md">
                        <div className="flex justify-between items-end border-b border-border/40 pb-6">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Price</p>
                                <p className="text-5xl font-extrabold text-foreground tracking-tighter">{formatCurrency(product.price)}</p>
                            </div>
                        </div>

                        <a href={product.gumroadLink} target="_blank" rel="noopener noreferrer" className="block transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <Button size="lg" className="w-full text-lg font-bold py-8 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl">
                                Buy Now via Gumroad
                                <ShoppingCart className="ml-3 h-6 w-6" />
                            </Button>
                        </a>

                        <div className="space-y-3 pt-2">
                            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Instant Digital Delivery
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="space-y-10 overflow-hidden">
                    <div className="border-b border-border/40 pb-8">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                            {product.category || 'Digital Asset'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground break-words">{product.title}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed font-light break-words">{product.excerpt}</p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none break-words
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-loose
                prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80
                prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border/50
                prose-strong:text-foreground prose-strong:font-bold
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 overflow-x-hidden">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
