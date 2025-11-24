"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary-foreground"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
          </div>
          <h1 className="font-bold text-xl tracking-tight hidden md:block">Easing Playground</h1>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/">
            <Button 
              variant={pathname === "/" ? "secondary" : "ghost"} 
              size="sm"
            >
              Framer Motion
            </Button>
          </Link>
          <Link href="/gsap">
            <Button 
              variant={pathname === "/gsap" ? "secondary" : "ghost"} 
              size="sm"
            >
              GSAP
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden lg:block">
            Built with Next.js
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
