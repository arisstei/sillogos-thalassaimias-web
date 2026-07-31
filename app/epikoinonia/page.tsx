import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Στοιχεία επικοινωνίας και φόρμα αποστολής μηνύματος προς τον Σύλλογο Θαλασσαιμίας Ηρακλείου - Λασιθίου.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);

  const address = settings?.address || "Σολωμού Σολωμού 14, Εργατικές Κατοικίες Αγίας Αικατερίνης, 713 07, Ηράκλειο";
  const phone = settings?.contactPhone || "2810 289956";
  const email = settings?.contactEmail || "sylmesher@yahoo.gr";

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
          Είμαστε εδώ για εσάς
        </p>
        <h1 className="font-serif text-4xl font-semibold text-stone-900">Επικοινωνία</h1>
        <p className="mt-4 leading-relaxed text-stone-600">
          Στείλτε μας μήνυμα ή επικοινωνήστε απευθείας — θα χαρούμε να σας ακούσουμε.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="mb-4 font-serif text-lg font-semibold text-stone-900">Στοιχεία</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-medium text-stone-500">Διεύθυνση</dt>
                <dd className="mt-1 text-stone-800">{address}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-500">Τηλέφωνο / FAX</dt>
                <dd className="mt-1">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-stone-800 hover:text-[color:var(--color-accent)]">
                    {phone}
                  </a>
                </dd>
              </div>
              {email ? (
                <div>
                  <dt className="font-medium text-stone-500">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${email}`} className="text-stone-800 hover:text-[color:var(--color-accent)]">
                      {email}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        <div className="md:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
