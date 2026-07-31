import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

// Αν μια ολόκληρη παράγραφος είναι απλά ένα link YouTube (π.χ. επικολλημένο
// σε δική του γραμμή, όπως γίνεται συνήθως όταν παίρνουμε κείμενο από
// Facebook), το δείχνουμε ως ενσωματωμένο video player αντί για απλό link.
const YOUTUBE_RE =
  /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,})(?:[?&].*)?$/;

function getYouTubeId(text: string): string | null {
  const match = text.trim().match(YOUTUBE_RE);
  return match ? match[1] : null;
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg bg-stone-100">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Βίντεο YouTube"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blockPlainText(value: any): string {
  if (!value?.children) return "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return value.children.map((c: any) => c.text || "").join("");
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1200).fit("max").auto("format").url();
      if (!url) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg bg-stone-100">
            <Image
              src={url}
              alt={value.alt || ""}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-stone-500">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={value?.blank ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[color:var(--color-accent)] underline decoration-1 underline-offset-2 hover:opacity-80"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-serif text-xl font-semibold text-stone-900 sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-stone-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[color:var(--color-accent)] pl-4 italic text-stone-600">
        {children}
      </blockquote>
    ),
    normal: ({ children, value }) => {
      const videoId = getYouTubeId(blockPlainText(value));
      if (videoId) return <YouTubeEmbed videoId={videoId} />;
      return <p className="my-4 leading-relaxed text-stone-700">{children}</p>;
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1 text-stone-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1 text-stone-700">{children}</ol>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: unknown[] }) {
  if (!value || value.length === 0) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />;
}
