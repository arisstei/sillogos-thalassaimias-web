import Link from "next/link";
import Image from "next/image";
import { getLatestPosts, getPageBySlug, getSiteSettings } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { excerptFromBody } from "@/lib/portableTextExcerpt";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;

export default async function HomePage() {
  const [siteSettings, latestPosts, aboutPage] = await Promise.all([
    getSiteSettings().catch(() => null),
    getLatestPosts(3).catch(() => []),
    getPageBySlug("ο-σύλλογός-μας").catch(() => null),
  ]);

  const aboutImageUrl = urlForImage(aboutPage?.mainImage)
    ?.width(900)
    .height(650)
    .fit("crop")
    .auto("format")
    .url();
  const aboutExcerpt = excerptFromBody(aboutPage?.body as unknown[]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
            Σύλλογος Ασθενών
          </p>
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            {siteSettings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου"}
          </h1>
          {siteSettings?.tagline ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
              {siteSettings.tagline}
            </p>
          ) : (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
              Ενημέρωση, στήριξη και ενεργή παρουσία για τους ασθενείς με Μεσογειακή Αναιμία
              στο Ηράκλειο και τον Λασίθι.
            </p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/nea"
              className="rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-dark)]"
            >
              Δείτε τα Νέα μας
            </Link>
            <Link
              href="/επικοινωνία"
              className="rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400"
            >
              Επικοινωνία
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      {aboutPage ? (
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {aboutImageUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100 md:order-2">
                <Image
                  src={aboutImageUrl}
                  alt={aboutPage.mainImage?.alt || aboutPage.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            ) : null}
            <div className={aboutImageUrl ? "md:order-1" : ""}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
                Ποιοι είμαστε
              </p>
              <h2 className="font-serif text-3xl font-semibold text-stone-900">
                {aboutPage.title}
              </h2>
              {aboutExcerpt ? (
                <p className="mt-4 leading-relaxed text-stone-600">{aboutExcerpt}</p>
              ) : null}
              <Link
                href={`/${aboutPage.slug.current}`}
                className="mt-6 inline-block text-sm font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                Διαβάστε περισσότερα →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Latest news */}
      {latestPosts.length > 0 ? (
        <section className="border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-serif text-3xl font-semibold text-stone-900">Τελευταία Νέα</h2>
              <Link
                href="/nea"
                className="text-sm font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                Όλα τα νέα →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Quick links */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/foreis"
            className="group rounded-lg border border-stone-200 bg-white p-8 transition-shadow hover:shadow-md"
          >
            <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-[color:var(--color-accent)]">
              Συνεργαζόμενοι Φορείς
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Δείτε τους αδελφούς συλλόγους θαλασσαιμίας και μεσογειακής αναιμίας σε όλη την Ελλάδα.
            </p>
          </Link>
          <Link
            href="/nomothesia"
            className="group rounded-lg border border-stone-200 bg-white p-8 transition-shadow hover:shadow-md"
          >
            <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-[color:var(--color-accent)]">
              Νομοθεσία &amp; Έγγραφα
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Χρήσιμα έγγραφα, εγκύκλιοι και νομοθεσία για παροχές, ΚΕΠΑ, εργασιακά και συνταξιοδοτικά.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
