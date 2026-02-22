

# Shopify-Ready machen: Konfigurierbare Store-Verbindung

## Ziel
Die Shopify-Konfiguration (Store-Domain und Storefront Access Token) wird aus dem Code herausgenommen und uber Umgebungsvariablen steuerbar gemacht. So kannst du den Code exportieren, auf deinem eigenen Hosting deployen und einfach deine eigenen Shopify-Zugangsdaten einsetzen.

## Was wird gemacht

### 1. Umgebungsvariablen statt Hardcoded-Werte
Die Datei `src/lib/shopify.ts` verwendet aktuell fest eingetragene Werte:
- Store-Domain: `rifa-vision-n4uwr.myshopify.com`
- Storefront Token: `2430ff0301ce8d44f090a5fbb78b6b2e`

Diese werden durch Umgebungsvariablen ersetzt:
- `VITE_SHOPIFY_STORE_DOMAIN`
- `VITE_SHOPIFY_STOREFRONT_TOKEN`

### 2. `.env.example`-Datei erstellen
Eine Vorlage-Datei, die zeigt, welche Variablen gesetzt werden mussen:
```
VITE_SHOPIFY_STORE_DOMAIN=dein-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=dein-storefront-access-token
```

### 3. `.env`-Datei mit den aktuellen Werten
Damit die Seite weiterhin funktioniert, werden die aktuellen Werte in eine `.env`-Datei geschrieben.

### 4. Fehlermeldung bei fehlender Konfiguration
Wenn die Umgebungsvariablen nicht gesetzt sind, wird eine hilfreiche Fehlermeldung angezeigt, damit klar ist, was konfiguriert werden muss.

---

## Technische Details

**Datei-Anderungen:**
- `src/lib/shopify.ts` -- Umgebungsvariablen statt Hardcoded-Werte, Validierung beim Start
- `.env.example` -- Neue Datei mit Vorlage
- `.env` -- Neue Datei mit aktuellen Werten

**Export-Anleitung (nach dem Implementieren):**
1. Code aus Lovable exportieren (GitHub)
2. `.env`-Datei im Projekt anlegen mit deinen eigenen Shopify-Daten
3. Storefront Access Token bekommst du in deinem Shopify Admin unter: Apps > Headless > Storefront API
4. Deployen (z.B. Vercel, Netlify) und die Umgebungsvariablen dort eintragen

