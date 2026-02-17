import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const svgToDataUri = require("mini-svg-data-uri");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground))",
                popover: "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground))",
                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",
                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground))",
                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground))",
                accent: "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground))",
                destructive: "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
            },
            backgroundSize: {
                "300%": "300%",
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "shimmer": "shimmer 2s linear infinite",
                "gradient-x": "gradient-x 15s ease infinite",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "shimmer": {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center"
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center"
                    },
                },
            },
        },
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("tailwindcss-animate"),
        // Plugin to add utilities for SVG patterns (grid, dots, etc)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function ({ matchUtilities, theme }: any) {
            matchUtilities(
                {
                    "bg-grid": (value: string) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                },
                { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
            );
        },
    ],
};
export default config;
