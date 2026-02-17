"use client";

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, Search, Loader2, ChevronDown, Link2, Check, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProductsAction } from '@/app/actions/product-actions';

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products: initialProducts }: ProductGridProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [hasMore, setHasMore] = useState(initialProducts.length >= 5);
    const [isPending, startTransition] = useTransition();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const loadMore = () => {
        if (isPending || !hasMore) return;

        startTransition(async () => {
            try {
                const nextProducts = await fetchProductsAction(products.length, 5);
                if (nextProducts.length < 5) {
                    setHasMore(false);
                }
                setProducts((prev) => [...prev, ...nextProducts]);
            } catch (error) {
                console.error("Failed to load more products:", error);
            }
        });
    };

    const copyProductUrl = async (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();

        const url = `${window.location.origin}/products/${product.slug}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(product.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopiedId(product.id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const shareProduct = async (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();

        const url = `${window.location.origin}/products/${product.slug}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.excerpt,
                    url: url,
                });
            } catch {
                // User cancelled share
            }
        } else {
            // Fallback: copy URL
            await copyProductUrl(e, product);
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-20 pt-10 scroll-mt-20" id="products">
            <div className="max-w-md mx-auto relative group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary/50 h-6 w-6 group-focus-within:text-primary transition-colors" />
                <Input
                    placeholder="Search premium blueprints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 h-16 bg-white/[0.05] backdrop-blur-3xl border-white/10 focus:border-primary/50 transition-all rounded-full text-lg shadow-2xl text-white"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: (index % 5) * 0.1, ease: "easeOut" }}
                            layout
                            className="h-full"
                        >
                            <Link href={`/products/${product.slug}`} className="block h-full group">
                                <Card className="h-full flex flex-col overflow-hidden border-white/[0.08] group-hover:border-primary/50 transition-all duration-700 
                                    group-hover:shadow-[0_0_80px_-20px_rgba(var(--primary),0.4)] group-hover:-translate-y-5 
                                    bg-[#09090b]/80 backdrop-blur-3xl relative rounded-[3.5rem] shadow-2xl">

                                    <div className="aspect-[16/11] w-full overflow-hidden bg-slate-900/40 relative">
                                        {(product.imageUrl && (product.imageUrl.startsWith('http') || product.imageUrl.startsWith('/'))) ? (
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-all duration-1000 group-hover:scale-110"
                                                priority={index < 3}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20 text-[10px] uppercase tracking-[0.4em] font-black italic">
                                                Masterpiece Pending
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-95" />

                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                                            <div className="bg-white text-black font-black text-xs tracking-[0.2em] uppercase px-12 py-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                                                View Blueprint
                                            </div>
                                        </div>

                                        <div className="absolute top-8 right-8 z-10">
                                            <div className="px-5 py-2 bg-black/60 backdrop-blur-3xl rounded-full border border-white/10">
                                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.category || 'Asset'}</span>
                                            </div>
                                        </div>

                                        {/* Share & Copy URL Buttons */}
                                        <div className="absolute top-8 left-8 z-10 flex gap-2">
                                            <button
                                                onClick={(e) => copyProductUrl(e, product)}
                                                className="p-2.5 bg-black/60 backdrop-blur-3xl rounded-full border border-white/10 
                                                    hover:bg-primary/80 hover:border-primary transition-all duration-300 
                                                    opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                                title="Copy product URL"
                                            >
                                                {copiedId === product.id ? (
                                                    <Check className="h-4 w-4 text-green-400" />
                                                ) : (
                                                    <Link2 className="h-4 w-4 text-white" />
                                                )}
                                            </button>
                                            <button
                                                onClick={(e) => shareProduct(e, product)}
                                                className="p-2.5 bg-black/60 backdrop-blur-3xl rounded-full border border-white/10 
                                                    hover:bg-primary/80 hover:border-primary transition-all duration-300 
                                                    opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 delay-75"
                                                title="Share product"
                                            >
                                                <Share2 className="h-4 w-4 text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    <CardHeader className="pb-6 pt-10 px-12 relative">
                                        <CardTitle className="text-3xl font-black tracking-tight leading-tight text-white group-hover:text-primary transition-colors duration-500">
                                            {product.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 text-base leading-relaxed mt-5 break-words font-medium text-slate-100/90 italic">
                                            {product.excerpt}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pb-12 mt-auto px-12">
                                        <div className="flex items-center justify-between pt-10 border-t border-white/[0.1]">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em] leading-none mb-4">Investment</span>
                                                <span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-pink-600 drop-shadow-[0_10px_10px_rgba(236,72,153,0.3)]">
                                                    {formatCurrency(product.price)}
                                                </span>
                                            </div>
                                            <div className="h-18 w-18 md:h-20 md:w-20 rounded-[2rem] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary group-hover:rotate-[360deg] transition-all duration-1000 shadow-2xl">
                                                <ArrowRight size={32} />
                                            </div>
                                        </div>
                                    </CardContent>

                                    {/* Subtle Ambient Glow */}
                                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Show More Button */}
            {hasMore && !searchTerm && (
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={loadMore}
                        disabled={isPending}
                        variant="outline"
                        className="h-14 px-10 rounded-full border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/40 text-white font-bold text-base gap-3 transition-all duration-500 hover:-translate-y-1 shadow-xl hover:shadow-primary/10"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin text-pink-500" />
                                <span className="text-sm tracking-wider">Loading...</span>
                            </>
                        ) : (
                            <>
                                <span>Show More</span>
                                <ChevronDown className="h-5 w-5" />
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* End of catalog message */}
            {!hasMore && !searchTerm && products.length > 0 && (
                <div className="flex flex-col items-center gap-6 opacity-30 py-4">
                    <div className="h-1 w-80 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="text-xs font-black text-white uppercase tracking-[0.8em] whitespace-nowrap">Catalog Fully Deployed</span>
                </div>
            )}

            {filteredProducts.length === 0 && (
                <div className="text-center py-40 rounded-[5rem] border-2 border-dashed border-white/10 bg-white/[0.02]">
                    <Search className="mx-auto h-24 w-24 text-white/5 mb-8" />
                    <p className="text-white text-4xl font-black tracking-tighter mb-4">No Blueprints Found</p>
                    <p className="text-slate-400 text-lg font-medium">Try refining your search parameters.</p>
                </div>
            )}
        </div>
    );
}
