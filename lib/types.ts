export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface Category {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: Category[];
  body?: unknown[];
  seo?: Seo;
}

export interface Page {
  _id: string;
  _type: "page";
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  body?: unknown[];
  showInMenu?: boolean;
  menuOrder?: number;
  seo?: Seo;
}

export interface PartnerOrganization {
  _id: string;
  name: string;
  slug?: SanitySlug;
  logo?: SanityImage;
  address?: string;
  postalCode?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  notes?: string;
}

export interface LegalDocument {
  _id: string;
  title: string;
  slug?: SanitySlug;
  date?: string;
  description?: string;
  file?: {
    asset?: {
      url?: string;
      originalFilename?: string;
      extension?: string;
      size?: number;
    };
  };
  category?: Category;
}

export interface SocialLink {
  platform?: string;
  url?: string;
}

export interface SiteSettings {
  title: string;
  tagline?: string;
  logo?: SanityImage;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: SocialLink[];
  footerText?: string;
  defaultSeo?: Seo;
}
