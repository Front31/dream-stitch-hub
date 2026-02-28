

## Plan: Navigation dynamisch aus Shopify Menüs laden

### Was du in Shopify hinterlegen musst

Die Shopify Storefront API hat eine `menu(handle:)` Query. Dein Screenshot zeigt drei Menüs. Damit die aktuelle Navigation bestehen bleibt, müssen die Menüs in Shopify so konfiguriert sein:

**Hauptmenü** (Handle: `main-menu`) — für den Header:

```text
Menüpunkt          → Link-Typ        → Ziel
─────────────────────────────────────────────
Produkte           → Seite/Katalog   → /collections/all  (oder /collections)
Über uns           → Seite           → /pages/about
FAQ                → Seite           → /pages/faq
Kontakt            → Seite           → /pages/contact
```

**Fußzeilenmenü** (Handle: `footer`) — für den Footer:

```text
Menüpunkt          → Link-Typ        → Ziel
─────────────────────────────────────────────
Alle Produkte      → Katalog         → /collections/all
Über uns           → Seite           → /pages/about
FAQ                → Seite           → /pages/faq
Versand            → Seite           → /pages/shipping
Kontakt            → Seite           → /pages/contact
Impressum          → Seite           → /pages/impressum
Datenschutz        → Seite           → /pages/datenschutz
AGB                → Seite           → /pages/agb
```

Die Link-URLs aus Shopify werden dann auf interne React-Router-Pfade gemappt (z.B. `/pages/about` → `/about`, `/collections/all` → `/collection`).

### Technische Umsetzung

1. **Neue Query + Fetch-Funktion in `src/lib/shopify.ts`**
   - GraphQL `menu(handle: $handle)` Query mit `items { title, url, type, items { title, url, type } }`
   - Funktion `fetchMenu(handle)` die das Menü abruft

2. **Neuer Hook `useShopifyMenu` in `src/hooks/useShopifyContent.ts`**
   - Gecached wie die bestehenden Hooks
   - Nimmt den Menu-Handle als Parameter (z.B. `'main-menu'`, `'footer'`)

3. **URL-Mapping-Utility**
   - Funktion die Shopify-URLs (`https://store.myshopify.com/pages/about`) auf lokale React-Router-Pfade (`/about`) mappt
   - Erkennt `/pages/X` → `/X`, `/collections/all` → `/collection`, `/collections/X` → `/collection?type=X`

4. **`FloatingHeader.tsx` anpassen**
   - `useShopifyMenu('main-menu')` aufrufen
   - `navItems` dynamisch aus der API-Antwort generieren statt hardcoded
   - Fallback auf aktuelle hardcoded Items wenn API nicht erreichbar

5. **`Footer.tsx` anpassen**
   - `useShopifyMenu('footer')` aufrufen
   - Footer-Links dynamisch rendern
   - Fallback auf aktuelle hardcoded Links

