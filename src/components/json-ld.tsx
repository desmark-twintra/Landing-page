/**
 * Renders a JSON-LD graph node into the document.
 *
 * The payload is always author-controlled data from `src/content/*` — no user
 * input reaches it — but `JSON.stringify` output still needs its `<` escaped so
 * a stray sequence in copy can never close the script tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
