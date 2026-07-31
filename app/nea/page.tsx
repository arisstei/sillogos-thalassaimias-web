import type { Metadata } from "next";
import { getAllPosts } from "@/lib/sanity/queries";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Νέα",
  description: "Νέα και ανακοινώσεις του Συλλόγου Θαλασσαιμίας Ηρακλείου - Λασιθίου.",
};

export default async function NewsListPage() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
          Ενημέρωση
        </p>
        <h1 className="font-serif text-4xl font-semibold text-stone-900">Νέα &amp; Ανακοινώσεις</h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-stone-500">Δεν υπάρχουν ακόμα δημοσιευμένα άρθρα.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
