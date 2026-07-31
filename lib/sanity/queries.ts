import { client } from "./client";
import type {
  Post,
  Page,
  Category,
  PartnerOrganization,
  LegalDocument,
  SiteSettings,
} from "../types";

// ---- fragments ----

const imageFragment = `{ asset->{_id, url}, alt, caption }`;
const categoryFragment = `{ _id, title, slug }`;

const postFragment = `{
  _id,
  _type,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage${imageFragment},
  categories[]->${categoryFragment},
  seo
}`;

const postWithBodyFragment = `{
  _id,
  _type,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage${imageFragment},
  categories[]->${categoryFragment},
  body,
  seo
}`;

const pageFragment = `{
  _id,
  _type,
  title,
  slug,
  mainImage${imageFragment},
  body,
  showInMenu,
  menuOrder,
  seo
}`;

// Μόνο έγγραφα με πραγματικό slug εμφανίζονται σε λίστες/μενού — ελλιπή
// (π.χ. ημιτελή draft από την παλιά εξαγωγή) δεν σπάνε τα links.
const HAS_SLUG = "defined(slug.current)";

// Παλιές WordPress σελίδες-"εργαλεία" που τώρα καλύπτονται πλήρως από
// dedicated sections (/nea, /foreis, /nomothesia) ή από την custom αρχική
// σελίδα -- δεν πρέπει να εμφανίζονται (ξανά) στο κύριο μενού.
const LEGACY_UTILITY_SLUGS = [
  "archiki", // custom αρχική σελίδα -> app/page.tsx, όχι αυτή
  "nea-ekdiloseis", // -> /nea
  "business-directory", // -> /foreis
  "nomothesia", // -> /nomothesia (μετά το greeklish re-import πήρε αυτό το slug)
  "syllogoi", // -> /foreis (λίστα φορέων)
];
const NOT_LEGACY_UTILITY = LEGACY_UTILITY_SLUGS.map(
  (s) => `slug.current != "${s}"`
).join(" && ");

// ---- site settings ----

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      title,
      tagline,
      logo${imageFragment},
      contactEmail,
      contactPhone,
      address,
      socialLinks[]{platform, url},
      footerText,
      defaultSeo
    }`
  );
}

// ---- navigation (static pages marked showInMenu) ----

export async function getNavPages(): Promise<Page[]> {
  return client.fetch(
    `*[_type == "page" && showInMenu == true && ${HAS_SLUG} && ${NOT_LEGACY_UTILITY}] | order(coalesce(menuOrder, 999) asc, title asc)${pageFragment}`
  );
}

// ---- posts / news ----

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && ${HAS_SLUG}] | order(publishedAt desc)${postFragment}`
  );
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && ${HAS_SLUG}] | order(publishedAt desc)[0...$limit]${postFragment}`,
    { limit }
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]${postWithBodyFragment}`,
    { slug }
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "post" && ${HAS_SLUG}]{ "slug": slug.current }`
  );
  return slugs.map((s) => s.slug);
}

// ---- static pages ----

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]${pageFragment}`, {
    slug,
  });
}

export async function getAllPageSlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "page" && ${HAS_SLUG}]{ "slug": slug.current }`
  );
  return slugs.map((s) => s.slug);
}

// ---- categories ----

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(`*[_type == "category"] | order(title asc)${categoryFragment}`);
}

// ---- partner organizations ----

export async function getAllPartnerOrganizations(): Promise<PartnerOrganization[]> {
  return client.fetch(
    `*[_type == "partnerOrganization"] | order(name asc){
      _id,
      name,
      slug,
      logo${imageFragment},
      address,
      postalCode,
      phone,
      fax,
      email,
      website,
      notes
    }`
  );
}

// ---- legal documents ----

export async function getAllLegalDocuments(): Promise<LegalDocument[]> {
  return client.fetch(
    `*[_type == "legalDocument"] | order(date desc){
      _id,
      title,
      slug,
      date,
      description,
      file{ asset->{ url, originalFilename, extension, size } },
      category${categoryFragment}
    }`
  );
}
