// Εξάγει ένα σύντομο απόσπασμα απλού κειμένου από το πρώτο "normal" block
// ενός portable text σώματος — χρήσιμο για teaser κάρτες.
export function excerptFromBody(body: unknown[] | undefined, maxLen = 220): string {
  if (!body || body.length === 0) return "";
  for (const block of body) {
    const b = block as { _type?: string; style?: string; children?: { text?: string }[] };
    if (b._type === "block" && (!b.style || b.style === "normal") && b.children) {
      const text = b.children.map((c) => c.text || "").join("");
      if (text.trim()) {
        return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
      }
    }
  }
  return "";
}
