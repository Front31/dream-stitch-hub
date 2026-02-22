

# Collection-Handle auf "Startseite" aendern

## Was wird gemacht

Der Collection-Handle in `FeaturedSection.tsx` wird von `rifa-cards-empfiehlt` auf `startseite` geaendert, damit die Produkte aus deiner Shopify-Collection "Startseite" auf der Homepage angezeigt werden.

## Technische Details

### Datei: `src/components/FeaturedSection.tsx` (Zeile 27)

Aenderung von:
```
fetchCollectionProducts('rifa-cards-empfiehlt', 6)
```
zu:
```
fetchCollectionProducts('startseite', 6)
```

Die Fallback-Logik bleibt bestehen: Wenn "Startseite" leer ist, wird zuerst "featured" versucht, dann alle Produkte.

