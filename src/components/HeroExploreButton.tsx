'use client';

import { ArrowDown } from 'lucide-react';

export function HeroExploreButton() {
    const handleScroll = () => {
        const el = document.getElementById('products');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <button
                onClick={handleScroll}
                className="group inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 h-14 rounded-full text-base shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
                Explore Products
                <ArrowDown className="h-5 w-5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>

            <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 h-14 rounded-full font-semibold text-base border-2 border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:-translate-y-0.5"
            >
                Learn More
            </a>
        </div>
    );
}
