import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Σύνδεσμοι",
  description: "Χρήσιμοι σύνδεσμοι προς φορείς, υπουργεία και οργανισμούς σχετικούς με τη μεσογειακή αναιμία και την αιμοδοσία.",
};

// Στατική σελίδα (αντικαθιστά το γενικό catch-all app/[slug]/page.tsx για
// το slug "syndesmoi") ώστε να δείχνουμε τους συνδέσμους σαν κάρτες με
// favicon του κάθε site, αντί για μια "κολλητή" παράγραφο με απλά links.
//
// Το favicon παίρνεται δυναμικά μέσω του δωρεάν service της Google
// (s2/favicons) βάσει του domain - δεν χρειάζεται να αποθηκεύσουμε ή να
// ανεβάσουμε εικόνες εμείς.

type LinkItem = { title: string; href: string };

const LINKS: LinkItem[] = [
  { title: "Πανελλήνια Ομοσπονδία Σύλλογων Εθελοντών Αιμοδοτών", href: "https://posea-ota.gr/" },
  { title: "Εθνικό Κέντρο Αιμοδοσίας", href: "http://ekea.gr/" },
  { title: "Εθνικό Μητρώο Αιμοδοτών", href: "https://www.blooddonorregistry.gr/" },
  { title: "Εθνική Συνομοσπονδία Ατόμων με Αναπηρία", href: "https://www.esamea.gr/el" },
  { title: "Ειδήσεις & Δικαιώματα ΑΜΕΑ", href: "http://www.newsitamea.gr/" },
  { title: "Διεθνής Οργανισμός Θαλασσαιμίας", href: "https://www.thalassaemia.org.cy/" },
  { title: "Υπουργείο Υγείας", href: "http://www.moh.gov.gr/" },
  { title: "Υπουργείο Παιδείας", href: "https://www.minedu.gov.gr/" },
  { title: "Ο.Α.Ε.Δ. (ΔΥΠΑ)", href: "https://www.dypa.gov.gr/" },
];

function faviconUrl(href: string) {
  return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(href)}`;
}

export default function SyndesmoiPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-10">
        <h1 className="font-serif text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          Σύνδεσμοι
        </h1>
        <p className="mt-3 text-stone-600">Χρήσιμοι σύνδεσμοι</p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-lg border border-stone-200 bg-white p-5 text-center transition-colors hover:border-[color:var(--color-accent)] hover:bg-stone-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faviconUrl(link.href)}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-md bg-stone-100 object-contain"
              loading="lazy"
            />
            <span className="text-sm font-medium text-stone-800 group-hover:text-[color:var(--color-accent)]">
              {link.title}
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
