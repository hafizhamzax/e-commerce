import Link from 'next/link';
import { ShoppingBag, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'About - NexaVault',
    description: 'Learn about NexaVault — the premium marketplace for digital assets, tools, and templates.',
};

const features = [
    {
        icon: Zap,
        title: 'Instant Delivery',
        description: 'Every product is delivered digitally the moment you purchase — zero waiting, zero hassle.',
    },
    {
        icon: Shield,
        title: 'Quality Guaranteed',
        description: 'Every asset is hand-curated and vetted. You only get the best the creator economy has to offer.',
    },
    {
        icon: Globe,
        title: 'Built for Creators',
        description: 'From templates to tools, our catalogue empowers modern creators to build faster and smarter.',
    },
    {
        icon: Sparkles,
        title: 'New Assets Daily',
        description: 'Our library grows every day with fresh blueprints, resources, and premium digital goods.',
    },
];

export default function AboutPage() {
    return (
        <div className="space-y-24 animate-in fade-in duration-700">

            {/* Hero */}
            <section className="text-center space-y-8 py-20 md:py-32 relative overflow-hidden bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent rounded-[3rem] border border-gray-200 dark:border-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
                    <ShoppingBag size={14} />
                    Our Story
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
                        About NexaVault
                    </span>
                </h1>

                <p className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
                    We're building the ultimate marketplace for premium digital assets —
                    where quality meets instant access.
                </p>
            </section>

            {/* Mission */}
            <section className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                    Our Mission
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                    NexaVault was created to give creators, developers, and entrepreneurs instant access to
                    high-quality digital blueprints. We believe great tools should be accessible,
                    affordable, and delivered at the speed of thought. Every product in our vault is
                    personally reviewed so you never waste time on subpar resources.
                </p>
            </section>

            {/* Features Grid */}
            <section className="space-y-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Why NexaVault?
                    </h2>
                    <div className="h-1 flex-1 bg-gradient-to-r from-purple-500/30 via-transparent to-transparent ml-6 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="group p-8 rounded-[2.5rem] bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/[0.08] hover:border-purple-500/40 dark:hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-purple-500/10 hover:shadow-xl"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors duration-300">
                                        <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16 space-y-6 rounded-[3rem] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 border border-purple-100 dark:border-purple-500/10">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                    Ready to explore?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                    Browse our growing library of premium digital assets and find the perfect blueprint for your next project.
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 h-14 rounded-full text-base shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5" asChild>
                    <Link href="/#products">Browse Products</Link>
                </Button>
            </section>
        </div>
    );
}
