"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Page, SiteSettings } from "@/lib/types";

interface NavLink {
  href: string;
  label: string;
}

export default function Header({
  siteSettings,
  navPages,
}: {
  siteSettings: SiteSettings | null;
  navPages: Page[];
}) {
  const [open, setOpen] = useState(false);

  const links: NavLink[] = [
    { href: "/", label: "Αρχική" },
    { href: "/nea", label: "Νέα" },
    ...navPages.map((p) => ({ href: `/${p.slug.current}`, label: p.title })),
    { href: "/foreis", label: "Φορείς" },
    { href: "/nomothesia", label: "Νομοθεσία" },
  ];

  const siteTitle = siteSettings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Πάνω γραμμή: λογότυπο + ονομασία, κεντραρισμένα */}
      <div className="relative mx-auto flex max-w-6xl items-center justify-center px-5 py-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 sm:gap-4" aria-label={siteTitle}>
          <Image
            src="/logo.png"
            alt={siteTitle}
            width={250}
            height={164}
            priority
            className="h-16 w-auto sm:h-20"
          />
          <span className="max-w-[200px] text-left font-serif text-lg leading-tight font-bold text-stone-900 sm:max-w-[260px] sm:text-2xl">
            {siteTitle}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Μενού πλοήγησης"
          className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-md text-stone-700 sm:right-8 lg:hidden"
        >
          <span className="sr-only">Μενού</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Κάτω γραμμή: οριζόντιο μενού σε πλήρες πλάτος */}
      <nav className="hidden border-t border-b border-stone-200 bg-[color:var(--color-cream)] lg:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-5 py-3 sm:px-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-stone-700 transition-colors hover:text-[color:var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {open ? (
        <nav className="border-t border-stone-200 bg-[color:var(--color-cream)] px-5 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
