"use client";

import { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Lock, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await login(formData);

        if (result?.success) {
            router.push('/admin');
            router.refresh();
        } else {
            setError(result?.error || 'Authentication failed');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 group justify-center">
                        <div className="bg-primary text-primary-foreground p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                            <ShoppingBag size={24} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black tracking-tighter">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2 font-medium">Enter your credentials to manage your store</p>
                </div>

                <Card className="glass border-border/50 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
                    <CardHeader className="pt-8">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Admin Access
                        </CardTitle>
                        <CardDescription>
                            Please enter the administrator password.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold tracking-tight text-muted-foreground uppercase ml-1">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 rounded-xl bg-background/50 border-primary/20 focus:border-primary transition-all text-lg"
                                    required
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold animate-shake">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pb-8">
                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                                disabled={loading}
                            >
                                {loading ? 'Checking...' : 'Enter Dashboard'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center mt-8 text-sm text-muted-foreground font-medium">
                    Not an admin? <Link href="/" className="text-primary hover:underline underline-offset-4">Return to marketplace</Link>
                </p>
            </motion.div>
        </div>
    );
}
