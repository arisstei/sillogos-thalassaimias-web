import type { Metadata } from "next";
import { getAllPartnerOrganizations } from "@/lib/sanity/queries";

function SocialIcon({ platform }: { platform: string }) {
  const common = "h-4 w-4 shrink-0 fill-current";
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
      </svg>
    );
  }
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.94.55 9.38.55 9.38.55s7.44 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.5v-7l6.27 3.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
      <path d="M10.59 13.41a1 1 0 0 1 0-1.41l4.59-4.59a1 1 0 1 1 1.41 1.41L12 13.41a1 1 0 0 1-1.41 0Zm-2.83 2.83a4 4 0 0 1 0-5.66l1.06-1.06a1 1 0 1 1 1.41 1.41L9.17 11.99a2 2 0 0 0 0 2.83 2 2 0 0 0 2.83 0l1.06-1.06a1 1 0 1 1 1.41 1.41l-1.06 1.06a4 4 0 0 1-5.65 0Z" />
    </svg>
  );
}

const PLATFORM_LABEL: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  other: "Σύνδεσμος",
};

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Συνεργαζόμενοι Φορείς",
  description: "Κατάλογος συλλόγων θαλασσαιμίας και μεσογειακής αναιμίας σε όλη την Ελλάδα.",
};

export default async function PartnersPage() {
  const partners = await getAllPartnerOrganizations().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
          Δίκτυο
        </p>
        <h1 className="font-serif text-4xl font-semibold text-stone-900">Συνεργαζόμενοι Φορείς</h1>
        <p className="mt-4 leading-relaxed text-stone-600">
          Αδελφοί σύλλογοι θαλασσαιμίας και μεσογειακής αναιμίας σε όλη την Ελλάδα.
        </p>
      </header>

      {partners.length === 0 ? (
        <p className="text-stone-500">Δεν υπάρχουν ακόμα καταχωρημένοι φορείς.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div
              key={p._id}
              className="flex flex-col rounded-lg border border-stone-200 bg-white p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-stone-900">{p.name}</h3>
              <dl className="mt-3 space-y-1 text-sm text-stone-600">
                {p.address ? (
                  <div>
                    <dt className="sr-only">Διεύθυνση</dt>
                    <dd>
                      {p.address}
                      {p.postalCode ? `, ${p.postalCode}` : ""}
                    </dd>
                  </div>
                ) : null}
                {p.phone ? (
                  <div>
                    <dt className="sr-only">Τηλέφωνο</dt>
                    <dd>
                      <a href={`tel:${p.phone}`} className="hover:text-[color:var(--color-accent)]">
                        {p.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {p.email ? (
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${p.email}`} className="hover:text-[color:var(--color-accent)]">
                        {p.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
              {p.website ? (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-[color:var(--color-accent)] hover:underline"
                >
                  Ιστοσελίδα →
                </a>
              ) : null}
              {p.social && p.social.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {p.social.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-stone-600 hover:text-[color:var(--color-accent)]"
                      >
                        <SocialIcon platform={s.platform} />
                        {PLATFORM_LABEL[s.platform] || "Σύνδεσμος"}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
