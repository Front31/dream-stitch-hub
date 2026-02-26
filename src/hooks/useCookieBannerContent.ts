import { useShopMetafields } from './useShopifyContent';

const METAFIELD_IDENTIFIERS = [
  { namespace: 'cookie_banner', key: 'title' },
  { namespace: 'cookie_banner', key: 'description' },
  { namespace: 'cookie_banner', key: 'accept_all' },
  { namespace: 'cookie_banner', key: 'settings_label' },
  { namespace: 'cookie_banner', key: 'reject_label' },
  { namespace: 'cookie_banner', key: 'save_label' },
  { namespace: 'cookie_banner', key: 'necessary_label' },
  { namespace: 'cookie_banner', key: 'necessary_desc' },
  { namespace: 'cookie_banner', key: 'personalization_label' },
  { namespace: 'cookie_banner', key: 'personalization_desc' },
  { namespace: 'cookie_banner', key: 'marketing_label' },
  { namespace: 'cookie_banner', key: 'marketing_desc' },
  { namespace: 'cookie_banner', key: 'analytics_label' },
  { namespace: 'cookie_banner', key: 'analytics_desc' },
  { namespace: 'cookie_banner', key: 'privacy_link_text' },
];

const DEFAULTS: Record<string, string> = {
  title: 'Wir respektieren deine Privatsphäre',
  description: 'Wir verwenden Cookies, um dein Einkaufserlebnis zu verbessern. Du kannst selbst entscheiden, welche Cookies du zulassen möchtest.',
  accept_all: 'Alle akzeptieren',
  settings_label: 'Einstellungen',
  reject_label: 'Nur notwendige',
  save_label: 'Auswahl speichern',
  necessary_label: 'Technisch notwendige Cookies',
  necessary_desc: 'Diese Cookies sind erforderlich, damit die Website ordnungsgemäß funktioniert, z. B. Funktionen wie die Anmeldung oder das Hinzufügen von Artikeln zum Warenkorb.',
  personalization_label: 'Personalisierung',
  personalization_desc: 'Diese Cookies speichern Details zu Ihren Aktionen, um Ihren nächsten Besuch auf der Website zu personalisieren.',
  marketing_label: 'Marketing',
  marketing_desc: 'Diese Cookies werden von uns und unseren Partnern verwendet, einschließlich Shopify, um Marketingbotschaften zu optimieren und dir Werbung auf anderen Websites anzuzeigen.',
  analytics_label: 'Analysen',
  analytics_desc: 'Diese Cookies helfen uns zu verstehen, wie Sie mit der Website interagieren. Wir verwenden diese Daten, um verbesserungswürdige Bereiche zu identifizieren.',
  privacy_link_text: 'Mehr erfahren',
};

export function useCookieBannerContent() {
  const { metafields, isLoading } = useShopMetafields(METAFIELD_IDENTIFIERS);

  const get = (key: string): string => {
    const field = metafields.find((m) => m?.namespace === 'cookie_banner' && m?.key === key);
    return field?.value || DEFAULTS[key] || '';
  };

  return { get, isLoading };
}
