const de = {
  // Navigation
  'nav.products': 'Produkte',
  'nav.about': 'Über uns',
  'nav.faq': 'FAQ',
  'nav.contact': 'Kontakt',
  'nav.shipping': 'Versand & Rückgabe',
  'nav.login': 'Anmelden',
  'nav.account': 'Mein Konto',
  'nav.menu': 'Menü',

  // Hero
  'hero.badge': 'Premium TCG Produkte',
  'hero.title.line1': 'Deine Produkte.',
  'hero.title.sealed': 'Sealed.',
  'hero.title.premium': 'Premium.',
  'hero.description': 'Entdecke exklusive Booster Displays, Elite Trainer Boxen und Special Collections. Jedes Produkt sealed und mit Sorgfalt kuratiert.',
  'hero.cta': 'Zu den Produkten',
  'hero.cta2': 'Neue Drops entdecken',

  // Footer
  'footer.description': 'Premium TCG Sealed Produkte. Booster Displays, Elite Trainer Boxen und Special Collections für echte Sammler.',
  'footer.sealed_only': 'Keine Einzelkarten. Nur original versiegelte Produkte.',
  'footer.shop': 'Shop',
  'footer.all_products': 'Alle Produkte',
  'footer.booster_displays': 'Booster Displays',
  'footer.etb': 'Elite Trainer Boxen',
  'footer.special_collections': 'Special Collections',
  'footer.info': 'Info',
  'footer.service': 'Service',
  'footer.reply_time': 'Antwort innerhalb 24h',
  'footer.secure_payment': 'Sichere Zahlung mit',
  'footer.rights': '© {year} RiFa Cards. Alle Rechte vorbehalten.',
  'footer.impressum': 'Impressum',
  'footer.datenschutz': 'Datenschutz',
  'footer.agb': 'AGB',
  'footer.cookie_settings': 'Cookie-Einstellungen',

  // Cookie Banner
  'cookie.title': 'Wir respektieren deine Privatsphäre',
  'cookie.description': 'Wir verwenden Cookies, um dein Einkaufserlebnis zu verbessern. Du kannst selbst entscheiden, welche Cookies du zulassen möchtest.',
  'cookie.learn_more': 'Mehr erfahren',
  'cookie.accept_all': 'Alle akzeptieren',
  'cookie.save': 'Auswahl speichern',
  'cookie.settings': 'Einstellungen',
  'cookie.reject': 'Nur notwendige',
  'cookie.necessary': 'Technisch notwendige Cookies',
  'cookie.necessary_desc': 'Diese Cookies sind erforderlich, damit die Website ordnungsgemäß funktioniert, z. B. Funktionen wie die Anmeldung oder das Hinzufügen von Artikeln zum Warenkorb.',
  'cookie.personalization': 'Personalisierung',
  'cookie.personalization_desc': 'Diese Cookies speichern Details zu Ihren Aktionen, um Ihren nächsten Besuch auf der Website zu personalisieren.',
  'cookie.marketing': 'Marketing',
  'cookie.marketing_desc': 'Diese Cookies werden von uns und unseren Partnern verwendet, einschließlich Shopify, um Marketingbotschaften zu optimieren und dir Werbung auf anderen Websites anzuzeigen.',
  'cookie.analytics': 'Analysen',
  'cookie.analytics_desc': 'Diese Cookies helfen uns zu verstehen, wie Sie mit der Website interagieren. Wir verwenden diese Daten, um verbesserungswürdige Bereiche zu identifizieren.',

  // Products
  'products.add_to_cart': 'In den Warenkorb',
  'products.sold_out': 'Ausverkauft',
  'products.from': 'ab',

  // General
  'general.loading': 'Laden...',
  'general.error': 'Fehler',
  'general.back': 'Zurück',
} as const;

export default de;
export type TranslationKey = keyof typeof de;
