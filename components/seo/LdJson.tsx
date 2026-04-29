/**
 * Renders structured data as a `<script type="application/ld+json">` tag.
 * Use one per logical entity per page (Organization, CreativeWork, Article…)
 * and let crawlers pick whichever they need.
 */
type LdJsonProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function LdJson({ data }: LdJsonProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content; data is JSON-stringified, no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
