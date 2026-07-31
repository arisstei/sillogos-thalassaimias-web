import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export default function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-white">
            {siteSettings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου"}
          </h2>
          {siteSettings?.tagline ? (
            <p className="mt-3 text-sm leading-relaxed text-stone-400">{siteSettings.tagline}</p>
          ) : null}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400">
            Επικοινωνία
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {siteSettings?.address ? <li className="text-stone-400">{siteSettings.address}</li> : null}
            {siteSettings?.contactPhone ? (
              <li>
                <a href={`tel:${siteSettings.contactPhone}`} className="hover:text-white">
                  {siteSettings.contactPhone}
                </a>
              </li>
            ) : null}
            {siteSettings?.contactEmail ? (
              <li>
                <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-white">
                  {siteSettings.contactEmail}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400">
            Σύνδεσμοι
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/nea" className="hover:text-white">Νέα</Link>
            </li>
            <li>
              <Link href="/foreis" className="hover:text-white">Συνεργαζόμενοι Φορείς</Link>
            </li>
            <li>
              <Link href="/nomothesia" className="hover:text-white">Νομοθεσία</Link>
            </li>
          </ul>
          {siteSettings?.socialLinks && siteSettings.socialLinks.length > 0 ? (
            <ul className="mt-4 flex gap-4">
              {siteSettings.socialLinks.map((s, i) =>
                s.url ? (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-400 hover:text-white"
                    >
                      {s.platform || "Σύνδεσμος"}
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-stone-800 px-5 py-6 text-center text-xs text-stone-500 sm:px-8">
        {siteSettings?.footerText ? (
          <p className="mb-1">{siteSettings.footerText}</p>
        ) : null}
        <p>&copy; {year} {siteSettings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου"}</p>
      </div>
    </footer>
  );
}
