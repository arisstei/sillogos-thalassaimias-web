import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6nfgmc4a";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

// Μόνο ανάγνωση (viewer) — προαιρετικό, μόνο αν το dataset δεν είναι public.
// ΠΟΤΕ μην βάλεις εδώ το token εγγραφής (write token) που χρησιμοποιεί το
// import script· θα εκτεθεί στο browser αν χρησιμοποιηθεί σε client component.
const readToken = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: readToken,
  useCdn: !readToken, // το CDN κρύβει το πιο πρόσφατο draft, οπότε με token το απενεργοποιούμε
  perspective: "published",
});
