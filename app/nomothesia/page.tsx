import type { Metadata } from "next";
import { getAllLegalDocuments } from "@/lib/sanity/queries";
import type { LegalDocument } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Νομοθεσία",
  description: "Έγγραφα, εγκύκλιοι και νομοθεσία για παροχές, ΚΕΠΑ, εργασιακά και συνταξιοδοτικά.",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

function formatSize(bytes?: number) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export default async function LegalDocumentsPage() {
  const docs = await getAllLegalDocuments().catch((): LegalDocument[] => []);

  // Ομαδοποίηση ανά κατηγορία (π.χ. Παροχές, ΚΕΠΑ, Συνταξιοδοτικά, Εργασιακά)
  const groups = new Map<string, LegalDocument[]>();
  for (const doc of docs) {
    const key = doc.category?.title || "Λοιπά έγγραφα";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(doc);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
          Χρήσιμα Έγγραφα
        </p>
        <h1 className="font-serif text-4xl font-semibold text-stone-900">Νομοθεσία</h1>
        <p className="mt-4 leading-relaxed text-stone-600">
          Έγγραφα, εγκύκλιοι, ΦΕΚ και έντυπα σχετικά με παροχές, ΚΕΠΑ, εργασιακά και
          συνταξιοδοτικά θέματα.
        </p>
      </header>

      {docs.length === 0 ? (
        <p className="text-stone-500">Δεν υπάρχουν ακόμα καταχωρημένα έγγραφα.</p>
      ) : (
        <div className="space-y-12">
          {Array.from(groups.entries()).map(([groupTitle, groupDocs]) => (
            <section key={groupTitle}>
              <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">{groupTitle}</h2>
              <ul className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
                {groupDocs.map((doc) => (
                  <li key={doc._id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div>
                      <p className="font-medium text-stone-900">{doc.title}</p>
                      <p className="mt-1 text-xs text-stone-500">
                        {formatDate(doc.date)}
                        {doc.file?.asset?.size ? ` · ${formatSize(doc.file.asset.size)}` : ""}
                        {doc.file?.asset?.extension ? ` · ${doc.file.asset.extension.toUpperCase()}` : ""}
                      </p>
                      {doc.description ? (
                        <p className="mt-1 text-sm text-stone-600">{doc.description}</p>
                      ) : null}
                    </div>
                    {doc.file?.asset?.url ? (
                      <a
                        href={doc.file.asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-[color:var(--color-accent)] hover:text-white"
                      >
                        Λήψη ↓
                      </a>
                    ) : (
                      <span className="shrink-0 text-xs italic text-stone-400">
                        Το αρχείο δεν έχει ανέβει ακόμα
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
