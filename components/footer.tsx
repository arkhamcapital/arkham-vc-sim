"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className={cn("w-full border-t border-border bg-background/80")}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-mono tracking-widest uppercase text-[10px] text-muted-foreground/80">
            Simulatorvest
          </p>
          <p className="max-w-md leading-relaxed">
            This is a fictional investing simulation for educational and entertainment purposes only.
            Nothing here is financial, legal, or investment advice.
          </p>
          <p className="text-[10px] text-muted-foreground/70">
            © {new Date().getFullYear()} Simulatorvest. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-3 text-[11px] font-mono uppercase tracking-[0.16em]">

          <Link href="https://x.com/rarascode" target="_blank" className="hover:text-foreground transition-colors">
            rarascode
          </Link>
        </nav>
      </div>
    </footer>
  )
}

