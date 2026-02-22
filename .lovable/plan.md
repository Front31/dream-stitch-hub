
# SEO-Optimierung fur RiFa Cards

## Aktueller Stand

Die Seite hat nur minimale SEO-Grundlagen: einen einfachen `<title>`, eine kurze Meta-Description und Open Graph Tags in `index.html`. Es fehlen seitenspezifische Titles/Descriptions, strukturierte Daten, eine Sitemap, semantisches HTML und weitere wichtige SEO-Elemente.

## Geplante Massnahmen

### 1. Dynamische Meta-Tags pro Seite (React Helmet)

Installation von `react-helmet-async` und Einrichtung eines SEO-Wrappers, der auf jeder Seite individuelle `<title>` und `<meta>` Tags setzt:

| Seite | Title | Description |
|-------|-------|-------------|
| Startseite | RiFa Cards - Premium Pokemon TCG Produkte | Factory Sealed | Dein Shop fuer factory sealed Pokemon TCG Produkte. Booster Displays, Elite Trainer Boxen und Special Collections. 100% authentisch, schneller Versand. |
| Kollektion | Pokemon TCG Kollektion kaufen - RiFa Cards | Entdecke unser Sortiment an sealed Pokemon Booster Displays, Elite Trainer Boxen und Special Collections. Guenstige Preise, schneller Versand. |
| Produkt (dynamisch) | {Produktname} kaufen - RiFa Cards | {Produktbeschreibung, gekuerzt auf 155 Zeichen} |
| Ueber uns | Ueber RiFa Cards - Dein Pokemon TCG Haendler | Erfahre mehr ueber RiFa Cards: Von Sammlern fuer Sammler. 100% authentische, factory sealed Pokemon TCG Produkte. |
| FAQ | Haeufige Fragen - RiFa Cards Pokemon TCG Shop | Antworten auf haeufige Fragen zu Bestellung, Versand, Produkten und Rueckgabe bei RiFa Cards. |
| Kontakt | Kontakt - RiFa Cards | Nimm Kontakt mit RiFa Cards auf. Wir helfen dir gerne bei Fragen zu Bestellungen und Produkten. |
| Versand | Versand und Rueckgabe - RiFa Cards | Informationen zu Versandkosten, Lieferzeiten und Rueckgabebedingungen bei RiFa Cards. |
| Impressum | Impressum - RiFa Cards | Impressum und rechtliche Angaben von RiFa Cards. |
| Datenschutz | Datenschutzerklaerung - RiFa Cards | Datenschutzerklaerung und Informationen zum Umgang mit deinen Daten bei RiFa Cards. |
| AGB | AGB - RiFa Cards | Allgemeine Geschaeftsbedingungen von RiFa Cards fuer den Kauf von Pokemon TCG Produkten. |

### 2. index.html Verbesserungen

- `<html lang="de">` statt `"en"` (die Seite ist deutsch)
- Bessere Meta-Description mit Keywords
- `author` auf "RiFa Cards" statt "Lovable"
- `twitter:site` korrigieren (Lovable entfernen)
- Canonical URL hinzufuegen
- `theme-color` Meta-Tag

### 3. Strukturierte Daten (JSON-LD)

- **Organization Schema** auf der Startseite (Name, Logo, URL)
- **Product Schema** auf Produktseiten (Name, Preis, Verfuegbarkeit, Bilder)
- **BreadcrumbList Schema** fuer Navigation
- **FAQPage Schema** auf der FAQ-Seite

### 4. Semantisches HTML

- `<article>`, `<nav>`, `<main>`, `<section>` Tags pruefen und ergaenzen
- Alt-Texte bei Bildern verbessern (bereits teilweise vorhanden)
- Heading-Hierarchie sicherstellen (h1 > h2 > h3)

### 5. Sitemap und robots.txt

- `public/sitemap.xml` erstellen mit allen Seiten
- `robots.txt` um Sitemap-Verweis ergaenzen
- Disallow fuer irrelevante Pfade

### 6. Performance-relevante SEO

- Lazy Loading fuer Bilder sicherstellen (`loading="lazy"`)
- `rel="noopener noreferrer"` bei externen Links (bereits vorhanden)

---

## Technische Umsetzung

### Neue Dateien
- `src/components/SEO.tsx` - Wiederverwendbare SEO-Komponente mit react-helmet-async
- `public/sitemap.xml` - Statische Sitemap

### Geaenderte Dateien
- `index.html` - lang="de", verbesserte Meta-Tags, Theme Color
- `src/main.tsx` - HelmetProvider wrappen
- `src/pages/Index.tsx` - SEO-Komponente + Organization JSON-LD
- `src/pages/Collection.tsx` - SEO-Komponente
- `src/pages/About.tsx` - SEO-Komponente
- `src/pages/FAQ.tsx` - SEO-Komponente + FAQPage JSON-LD
- `src/pages/Contact.tsx` - SEO-Komponente
- `src/pages/Shipping.tsx` - SEO-Komponente
- `src/pages/Impressum.tsx` - SEO-Komponente
- `src/pages/Datenschutz.tsx` - SEO-Komponente
- `src/pages/AGB.tsx` - SEO-Komponente
- `src/components/ProductDetail.tsx` - SEO-Komponente + Product JSON-LD
- `public/robots.txt` - Sitemap-Verweis hinzufuegen

### Neue Dependency
- `react-helmet-async` fuer dynamische Head-Tags
