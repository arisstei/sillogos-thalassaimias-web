import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return undefined;
  return builder.image(source);
}
