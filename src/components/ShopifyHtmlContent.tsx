import { useMemo } from 'react';

/**
 * Splits HTML string at every <h1> or <h2> tag, rendering each section
 * inside its own styled card so the layout matches the fallback "Kachel" design.
 */
const splitAtHeadings = (html: string): string[] => {
  // Split before every <h1 or <h2 tag (case-insensitive)
  const parts = html.split(/(?=<h[12][\s>])/i);
  return parts.map((p) => p.trim()).filter(Boolean);
};

const proseClasses = `prose prose-sm max-w-none 
  prose-headings:font-display prose-headings:text-foreground 
  prose-p:text-muted-foreground prose-li:text-muted-foreground
  prose-a:text-accent prose-a:hover:underline
  prose-strong:text-foreground
  prose-ul:space-y-1 prose-ol:space-y-1`;

const ShopifyHtmlContent = ({
  html,
  className = '',
  splitCards = true,
}: {
  html: string;
  className?: string;
  /** When true (default), splits content at h1/h2 into separate cards */
  splitCards?: boolean;
}) => {
  const sections = useMemo(() => (splitCards ? splitAtHeadings(html) : [html]), [html, splitCards]);

  if (sections.length <= 1) {
    return (
      <div
        className={`${proseClasses} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <div
          key={i}
          className={`bg-card border border-border rounded-2xl p-6 md:p-8 ${proseClasses} ${className}`}
          dangerouslySetInnerHTML={{ __html: section }}
        />
      ))}
    </div>
  );
};

export default ShopifyHtmlContent;
