import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://rifacards.de';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/e0rYCbrMEYP7XcwCOy0oxsZ2Zu23/social-images/social-1771778519650-RIVA_MID_WITH_BG.webp';

const SEO = ({ title, description, canonical, type = 'website', image, jsonLd }: SEOProps) => {
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : undefined;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
