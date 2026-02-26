/**
 * Shopify API Integration
 */

import { toast } from 'sonner';

const SHOPIFY_API_VERSION = '2025-07';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
  console.error(
    '⚠️ Shopify ist nicht konfiguriert!\n' +
    'Bitte setze folgende Umgebungsvariablen:\n' +
    '  VITE_SHOPIFY_STORE_DOMAIN=dein-store.myshopify.com\n' +
    '  VITE_SHOPIFY_STOREFRONT_TOKEN=dein-storefront-access-token\n' +
    'Siehe .env.example für Details.'
  );
}

const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}, localeContext?: { language: string; country: string }) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
  };
  // Shopify Storefront API supports Accept-Language for localized content
  if (localeContext) {
    headers['Accept-Language'] = localeContext.language.toLowerCase();
  }
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      media(first: 20) {
        edges {
          node {
            mediaContentType
            alt
            ... on MediaImage {
              id
              image {
                url
                altText
              }
            }
            ... on Video {
              id
              sources {
                url
                mimeType
              }
            }
            ... on ExternalVideo {
              id
              host
              embeddedUrl
            }
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

export function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some(e => e.message.toLowerCase().includes('cart not found') || e.message.toLowerCase().includes('does not exist'));
}

export async function fetchProducts(first: number = 20, localeCtx?: { language: string; country: string }): Promise<ShopifyProduct[]> {
  try {
    const variables: Record<string, unknown> = { first };
    if (localeCtx) {
      variables.country = localeCtx.country;
      variables.language = localeCtx.language;
    }
    const data = await storefrontApiRequest(PRODUCTS_QUERY, variables, localeCtx);
    return data?.data?.products?.edges || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string, localeCtx?: { language: string; country: string }) {
  try {
    const variables: Record<string, unknown> = { handle };
    if (localeCtx) {
      variables.country = localeCtx.country;
      variables.language = localeCtx.language;
    }
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, variables, localeCtx);
    return data?.data?.productByHandle || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      handle
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export interface ShopifyCollection {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
    image?: {
      url: string;
      altText: string | null;
    } | null;
  };
}

export async function fetchCollectionProducts(handle: string, first: number = 50): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(COLLECTION_BY_HANDLE_QUERY, { handle, first });
    const products = data?.data?.collectionByHandle?.products?.edges || [];
    // Wrap in { node: ... } format to match ShopifyProduct interface
    return products.map((edge: { node: ShopifyProduct['node'] }) => ({ node: edge.node }));
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return [];
  }
}

export async function fetchCollections(first: number = 20): Promise<ShopifyCollection[]> {
  try {
    const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first });
    return data?.data?.collections?.edges || [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

// --- Shop Policies ---
export interface ShopifyPolicy {
  title: string;
  body: string;
  url: string;
}

export const SHOP_POLICIES_QUERY = `
  query GetShopPolicies {
    shop {
      name
      description
      privacyPolicy {
        title
        body
        url
      }
      termsOfService {
        title
        body
        url
      }
      refundPolicy {
        title
        body
        url
      }
      shippingPolicy {
        title
        body
        url
      }
    }
  }
`;

export interface ShopPolicies {
  name: string;
  description: string;
  privacyPolicy: ShopifyPolicy | null;
  termsOfService: ShopifyPolicy | null;
  refundPolicy: ShopifyPolicy | null;
  shippingPolicy: ShopifyPolicy | null;
}

export async function fetchShopPolicies(): Promise<ShopPolicies | null> {
  try {
    const data = await storefrontApiRequest(SHOP_POLICIES_QUERY);
    return data?.data?.shop || null;
  } catch (error) {
    console.error('Error fetching shop policies:', error);
    return null;
  }
}

// --- Shopify Pages ---
export interface ShopifyPage {
  id: string;
  title: string;
  handle: string;
  body: string;
}

export const PAGES_QUERY = `
  query GetPages($first: Int!) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
          body
        }
      }
    }
  }
`;

export const PAGE_BY_HANDLE_QUERY = `
  query GetPageByHandle($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      title
      handle
      body
    }
  }
`;

export async function fetchPages(first: number = 20): Promise<ShopifyPage[]> {
  try {
    const data = await storefrontApiRequest(PAGES_QUERY, { first });
    return (data?.data?.pages?.edges || []).map((e: { node: ShopifyPage }) => e.node);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function fetchPageByHandle(handle: string): Promise<ShopifyPage | null> {
  try {
    const data = await storefrontApiRequest(PAGE_BY_HANDLE_QUERY, { handle });
    return data?.data?.pageByHandle || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// --- Shop Metafields ---
export const SHOP_METAFIELDS_QUERY = `
  query GetShopMetafields($identifiers: [HasMetafieldsIdentifier!]!) {
    shop {
      metafields(identifiers: $identifiers) {
        namespace
        key
        value
        type
      }
    }
  }
`;

export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export async function fetchShopMetafields(identifiers: Array<{ namespace: string; key: string }>): Promise<(ShopifyMetafield | null)[]> {
  try {
    const data = await storefrontApiRequest(SHOP_METAFIELDS_QUERY, { identifiers });
    return data?.data?.shop?.metafields || [];
  } catch (error) {
    console.error('Error fetching shop metafields:', error);
    return [];
  }
}
