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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 group justify-center">
                        <div className="bg-purple-600 text-white p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                            <ShoppingBag size={24} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Enter your credentials to manage your store</p>
                </div>

                <Card className="bg-white dark:bg-[#0d0d12] border border-gray-200 dark:border-white/[0.08] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500" />
                    <CardHeader className="pt-8">
                        <CardTitle className="text-xl flex items-center gap-2 text-gray-900 dark:text-white">
                            <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            Admin Access
                        </CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">
                            Please enter the administrator password.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold tracking-tight text-gray-500 dark:text-gray-400 uppercase ml-1">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 focus:border-purple-400 dark:focus:border-purple-500 transition-all text-lg text-gray-900 dark:text-white placeholder:text-gray-400"
                                    required
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <div className="p-3 rounded-xl bg-red-50 dark:bg-destructive/10 border border-red-200 dark:border-destructive/20 text-red-600 dark:text-destructive text-sm font-semibold">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pb-8">
                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all hover:-translate-y-0.5 border-none"
                                disabled={loading}
                            >
                                {loading ? 'Checking...' : 'Enter Dashboard'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Not an admin? <Link href="/" className="text-purple-600 dark:text-purple-400 hover:underline underline-offset-4">Return to marketplace</Link>
                </p>
            </motion.div>
        </div>
    );
}
