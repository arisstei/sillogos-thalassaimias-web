"use client";

import Link from "next/link";
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
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[color:var(--color-cream)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-stone-900 sm:text-xl"
        >
          {siteTitle}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-[color:var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Μενού πλοήγησης"
          className="flex h-10 w-10 items-center justify-center rounded-md text-stone-700 lg:hidden"
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
