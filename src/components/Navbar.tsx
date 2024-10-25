"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background text-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M9 12l3-3 3 3M20 20l3 3-3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 22c4-6 8-6 8-12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          App Relius
        </Link>
        <div className="space-x-4 flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/projects">Projects</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
