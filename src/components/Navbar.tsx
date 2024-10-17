"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";


export default function Navbar() {
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();


  return (
    <nav className="bg-background text-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Your Name
        </Link>
        <div className="space-x-4 flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/about">{t('about')}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/projects">{t('projects')}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">{t('contact')}</Link>
          </Button>
          <ThemeToggle />
          <Button onClick={() => changeLocale('en')}>EN</Button>
          <Button onClick={() => changeLocale('pl')}>PL</Button>
        </div>
      </div>
    </nav>
  );
}