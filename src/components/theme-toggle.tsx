"use client";

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const THEME_KEY = 'theme';

export function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';

    root.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="dark:hidden" />
    </Button>
  );
}
