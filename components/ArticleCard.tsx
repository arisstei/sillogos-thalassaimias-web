import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { Post } from "@/lib/types";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export default function ArticleCard({ post }: { post: Post }) {
  if (!post.slug?.current) return null;

  const imageUrl = urlForImage(post.mainImage)?.width(700).height(460).fit("crop").auto("format").url();

  return (
    <Link
      href={`/nea/${post.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-stone-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <span className="font-serif text-sm">Σύλλογος Θαλασσαιμίας</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.categories && post.categories.length > 0 ? (
          <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent)]">
            {post.categories[0].title}
          </span>
        ) : null}
        <h3 className="font-serif text-lg font-semibold leading-snug text-stone-900 group-hover:text-[color:var(--color-accent)]">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
        ) : null}
        <span className="mt-4 text-xs text-stone-400">{formatDate(post.publishedAt)}</span>
      </div>
    </Link>
  );
}
