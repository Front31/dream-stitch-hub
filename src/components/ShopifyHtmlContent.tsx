/**
 * Renders HTML content from Shopify (policies, pages) safely.
 * Applies consistent styling to match the site's design system.
 */
const ShopifyHtmlContent = ({ html, className = '' }: { html: string; className?: string }) => {
  return (
    <div
      className={`prose prose-sm max-w-none 
        prose-headings:font-display prose-headings:text-foreground 
        prose-p:text-muted-foreground prose-li:text-muted-foreground
        prose-a:text-accent prose-a:hover:underline
        prose-strong:text-foreground
        prose-ul:space-y-1 prose-ol:space-y-1
        ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ShopifyHtmlContent;
