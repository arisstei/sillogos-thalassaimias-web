import type { Metadata } from "next";
import { getAllPartnerOrganizations } from "@/lib/sanity/queries";

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
