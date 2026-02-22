

# Kategorien und Featured-Produkte mit Shopify

## Was wird gemacht

Kategorien werden direkt mit Shopify **Collections** verbunden. Du kannst in Shopify Collections anlegen (z.B. "Booster Displays", "Elite Trainer Boxen", "Special Collections") und eine spezielle Collection (z.B. "RiFa Cards empfiehlt") erstellen, deren Produkte automatisch auf der Startseite angezeigt werden.

## So funktioniert es

- **Kategorien auf der Collection-Seite**: Wenn du auf "Booster Displays" klickst, werden nur Produkte aus der entsprechenden Shopify-Collection geladen
- **Startseite**: Zeigt nur Produkte aus der Collection "RiFa Cards empfiehlt" (oder wie du sie nennen willst)
- **Alles wird in Shopify verwaltet**: Du fügst Produkte einfach in Shopify zu einer Collection hinzu -- die Webseite zeigt sie automatisch an

## Was du in Shopify tun musst

1. Collections anlegen: z.B. "Booster Displays", "Elite Trainer Boxen", "Special Collections"
2. Eine Collection "RiFa Cards empfiehlt" (oder "featured") anlegen
3. Produkte den jeweiligen Collections zuordnen

---

## Technische Details

### 1. Neue GraphQL-Queries in `src/lib/shopify.ts`

- `COLLECTION_BY_HANDLE_QUERY`: Produkte einer bestimmten Collection per Handle laden
- `COLLECTIONS_QUERY`: Alle Collections laden (fuer dynamische Kategorie-Anzeige)
- `productType` und `tags` zu allen bestehenden Produkt-Queries hinzufuegen
- Neue Funktionen: `fetchCollectionProducts(handle)` und `fetchCollections()`
- `ShopifyProduct` Interface um `productType` und `tags` erweitern

### 2. Collection-Seite (`src/pages/Collection.tsx`)

- URL-Parameter `?type=` auslesen (z.B. `/collection?type=booster-displays`)
- Bei vorhandenem `type`-Parameter: Produkte aus der entsprechenden Shopify-Collection laden via `fetchCollectionProducts(handle)`
- Ohne Parameter: alle Produkte laden (wie bisher)
- Kategorie-Tabs oder Filter-Buttons oben anzeigen, basierend auf den vorhandenen Collections
- Aktive Kategorie visuell hervorheben

### 3. FeaturedSection (`src/components/FeaturedSection.tsx`)

- Statt `fetchProducts(6)` wird `fetchCollectionProducts('rifa-cards-empfiehlt')` aufgerufen
- Nur Produkte aus dieser speziellen Collection erscheinen auf der Startseite
- Fallback auf alle Produkte, falls die Collection leer oder nicht vorhanden ist

### 4. Kategorie-Links auf Startseite (`src/pages/Index.tsx`)

- Links aktualisieren: `/collection?type=booster-displays`, `/collection?type=elite-trainer-boxen`, `/collection?type=special-collections`
- Die Handles muessen mit den Shopify-Collection-Handles uebereinstimmen

### 5. Mapping-Strategie

Die Collection-Handles in Shopify werden direkt als URL-Parameter verwendet. Beispiel:
- Shopify Collection "Booster Displays" -> Handle `booster-displays` -> URL `/collection?type=booster-displays`

