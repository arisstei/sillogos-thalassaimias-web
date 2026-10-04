"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Page, SiteSettings } from "@/lib/types";

interface NavLink {
  href: string;
  label: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

export default function Header({
  siteSettings,
  navPages,
}: {
  siteSettings: SiteSettings | null;
  navPages: Page[];
}) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Οι τίτλοι έρχονται από το Sanity όταν υπάρχει σελίδα με το ίδιο slug.
  const titleOf = (slug: string, fallback: string) =>
    navPages.find((p) => p.slug.current === slug)?.title || fallback;

  const donorSlug = "giati-prepei-na-gineis-ethelontis-aimodotis";

  const nav: NavItem[] = [
    { label: "Αρχική", href: "/" },
    { label: "Νέα", href: "/nea" },
    { label: "Ενημέρωση", href: "/enimerosi" },
    {
      label: "Ο Σύλλογος",
      children: [
        { href: "/o-syllogos-mas", label: titleOf("o-syllogos-mas", "Ο Σύλλογός μας") },
        { href: "/i-monada-mas", label: titleOf("i-monada-mas", "Η μονάδα μας") },
      ],
    },
    { label: titleOf("thalassaimia", "Θαλασσαιμία"), href: "/thalassaimia" },
    {
      label: "Αιμοδοσία",
      children: [
        { href: "/aimodosia", label: titleOf("aimodosia", "Αιμοδοσία") },
        { href: `/${donorSlug}`, label: titleOf(donorSlug, "Γίνε Εθελοντής Αιμοδότης") },
      ],
    },
    {
      label: "Χρήσιμα",
      children: [
        { href: "/nomothesia", label: "Νομοθεσία" },
        { href: "/foreis", label: "Φορείς" },
        { href: "/syndesmoi", label: titleOf("syndesmoi", "Σύνδεσμοι") },
      ],
    },
  ];

  const siteTitle = siteSettings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου";

  const linkCls =
    "text-sm font-medium tracking-wide text-stone-700 transition-colors hover:text-[color:var(--color-accent)]";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 shadow-[0_8px_30px_-18px_rgba(53,25,31,0.45)] backdrop-blur-md">
      {/* Πάνω γραμμή: λογότυπο αριστερά, ενέργειες δεξιά */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={siteTitle}>
          <Image
            src="/logo.png"
            alt={siteTitle}
            width={250}
            height={164}
            priority
            className="h-14 w-auto shrink-0 sm:h-16"
          />
          <span className="max-w-[210px] font-serif text-base leading-tight font-bold text-stone-900 sm:max-w-[300px] sm:text-xl">
            {siteTitle}
          </span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/epikoinonia"
            className="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            Επικοινωνία
          </Link>
          <Link
            href={`/${donorSlug}`}
            className="rounded-full bg-[color:var(--color-accent)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-dark)]"
          >
            Γίνε Εθελοντής Αιμοδότης
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Μενού πλοήγησης"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-stone-700 lg:hidden"
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

      {/* Κάτω γραμμή: μενού με drop-down */}
      <nav className="hidden border-t border-stone-200 bg-[color:var(--color-cream)] lg:block" aria-label="Κύριο μενού">
        <ul className="mx-auto flex max-w-6xl items-center gap-x-9 px-5 sm:px-8">
          {nav.map((item) =>
            item.children ? (
              <li key={item.label} className="group relative">
                <button
                  type="button"
                  className={`${linkCls} flex items-center gap-1 py-3.5`}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <ul className="invisible absolute top-full left-0 min-w-[230px] translate-y-1 rounded-b-lg border border-t-2 border-stone-200 border-t-[color:var(--color-accent)] bg-white py-2 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="block px-5 py-2.5 text-sm text-stone-700 transition-colors hover:bg-stone-50 hover:text-[color:var(--color-accent)]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link href={item.href!} className={`${linkCls} block py-3.5`}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* Κινητό */}
      {open ? (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-stone-200 bg-[color:var(--color-cream)] px-5 py-3 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                    aria-expanded={openGroup === item.label}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-100"
                  >
                    {item.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={openGroup === item.label ? "rotate-180" : ""}
                    >
                      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openGroup === item.label ? (
                    <ul className="mb-1 ml-3 border-l-2 border-[color:var(--color-accent)]/30 pl-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-2 py-2 text-[15px] text-stone-600 hover:bg-stone-100"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li className="mt-2 flex flex-col gap-2 border-t border-stone-200 pt-3">
              <Link
                href="/epikoinonia"
                onClick={() => setOpen(false)}
                className="rounded-full border border-stone-300 px-4 py-2.5 text-center text-sm font-medium text-stone-700"
              >
                Επικοινωνία
              </Link>
              <Link
                href={`/${donorSlug}`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-[color:var(--color-accent)] px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Γίνε Εθελοντής Αιμοδότης
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
