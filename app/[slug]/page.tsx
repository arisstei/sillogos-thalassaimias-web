import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPageSlugs, getPageBySlug } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs().catch(() => []);
  return slugs
    .filter((slug) => slug !== "αρχικη") // η αρχική εξυπηρετείται από το app/page.tsx
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug).catch(() => null);
  if (!page) return {};
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
  };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug).catch(() => null);
  if (!page) notFound();

  const imageUrl = urlForImage(page.mainImage)?.width(1400).fit("max").auto("format").url();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          {page.title}
        </h1>
      </header>

      {imageUrl ? (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-stone-100">
          <Image
            src={imageUrl}
            alt={page.mainImage?.alt || page.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
          />
        </div>
      ) : null}

      <div className="prose-content">
        <PortableTextRenderer value={(page.body as unknown[]) || []} />
      </div>
    </article>
  );
}
