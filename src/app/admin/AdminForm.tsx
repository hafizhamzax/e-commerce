"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LogOut, Trash2, Loader2, Package } from 'lucide-react';
import { logout } from '@/lib/auth';
import { deleteProductAction } from '@/app/actions/product-actions';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface AdminFormProps {
    products: Product[];
}

export default function AdminForm({ products: initialProducts }: AdminFormProps) {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        price: '',
        description: '',
        excerpt: '',
        gumroadLink: '',
        imageUrl: '',
        category: 'Digital Product',
    });
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogout = async () => {
        await logout();
        router.push('/');
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product? This will remove it from the database permanently.')) return;

        setDeletingId(id);
        try {
            await deleteProductAction(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            router.refresh();
        } catch (err) {
            alert('Failed to delete product. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                }),
            });

            if (!res.ok) throw new Error('Failed to create product');

            router.push('/');
            router.refresh();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-1">Store Admin</h1>
                    <p className="text-muted-foreground font-medium">Manage your digital assets and inventory</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10 h-10 px-4 rounded-xl">
                    <LogOut size={16} />
                    Logout
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
                <Card className="bg-white dark:bg-white/[0.03] shadow-2xl border border-gray-200 dark:border-white/5 order-2 lg:order-1">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black tracking-tight">Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Title</label>
                                <Input
                                    name="title"
                                    placeholder="Premium UI Kit"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Slug</label>
                                    <Input
                                        name="slug"
                                        placeholder="premium-ui-kit"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Price ($)</label>
                                    <Input
                                        name="price"
                                        type="number"
                                        placeholder="29.99"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Gumroad Link</label>
                                <Input
                                    name="gumroadLink"
                                    placeholder="https://gum.co/l/..."
                                    value={formData.gumroadLink}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Image URL</label>
                                <Input
                                    name="imageUrl"
                                    placeholder="https://..."
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Excerpt</label>
                                <Textarea
                                    name="excerpt"
                                    placeholder="Short description for the grid..."
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows={2}
                                    className="rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Full Description</label>
                                <Textarea
                                    name="description"
                                    placeholder="Full details (Markdown supported)..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                    className="font-mono text-xs rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                                />
                            </div>

                            {error && <p className="text-destructive text-sm font-bold bg-destructive/10 p-3 rounded-lg border border-destructive/20">{error}</p>}

                            <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl text-lg font-black shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all bg-gradient-to-r from-purple-600 to-violet-600 text-white border-none">
                                {loading ? <Loader2 className="animate-spin h-6 w-6" /> : 'Publish Product'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6 order-1 lg:order-2">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <Package className="text-primary h-5 w-5" />
                            Inventory
                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-1">
                                {products.length}
                            </span>
                        </h2>
                    </div>

                    <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                        {products.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-500 dark:text-muted-foreground text-sm font-medium tracking-tight">Your inventory is empty</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="group bg-white dark:bg-white/[0.03] p-4 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all flex items-center justify-between gap-4 shadow-sm">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 dark:text-white truncate tracking-tight">{product.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-black text-purple-600 dark:text-purple-400 tracking-wider">{formatCurrency(product.price)}</span>
                                            <span className="text-[10px] text-gray-400 dark:text-muted-foreground uppercase tracking-[0.1em] font-medium border-l border-gray-200 dark:border-white/10 pl-2">{product.category || 'Asset'}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        disabled={deletingId === product.id}
                                        onClick={() => handleDelete(product.id)}
                                        className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                                    >
                                        {deletingId === product.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
