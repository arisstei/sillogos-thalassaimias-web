import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 60;

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const imageUrl = urlForImage(post.mainImage)?.width(1400).fit("max").auto("format").url();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link href="/nea" className="text-sm font-semibold text-[color:var(--color-accent)] hover:underline">
        ← Όλα τα νέα
      </Link>

      <header className="mt-6 mb-8">
        {post.categories && post.categories.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <span
                key={c._id}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-600"
              >
                {c.title}
              </span>
            ))}
          </div>
        ) : null}
        <h1 className="font-serif text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-stone-500">{formatDate(post.publishedAt)}</p>
      </header>

      {imageUrl ? (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-stone-100">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
          />
        </div>
      ) : null}

      <div className="prose-content">
        <PortableTextRenderer value={(post.body as unknown[]) || []} />
      </div>
    </article>
  );
}
