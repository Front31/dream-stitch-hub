

## Shopify Store Integration

Deine Shopify-Daten werden in die Umgebungsvariablen eingetragen, damit die App sich mit deinem Store verbindet.

### Was passiert:

Die `.env`-Datei wird aktualisiert mit:
- **Store-Domain**: `6iadwn-sc.myshopify.com`
- **Storefront Token**: `74152223e9eadb6b44db5a0592e89e23`

### Ergebnis:
- Alle Produkte aus deinem Shopify Store werden automatisch auf der Webseite angezeigt
- Der Warenkorb leitet zum Shopify Checkout deines Stores weiter
- Bilder, Preise und Verfügbarkeit kommen direkt aus deinem Store

### Technische Details:
- Datei `.env` wird mit den neuen Werten aktualisiert
- Die bestehende Shopify-Integration (`src/lib/shopify.ts`, `src/stores/cartStore.ts`) nutzt diese Werte bereits automatisch
- Keine weiteren Code-Änderungen nötig

