

## Fehlende Unterseiten erstellen & Footer-Links aktualisieren

### Was wird gebaut

Drei neue rechtliche Seiten, die im Footer bereits verlinkt aber noch nicht vorhanden sind:

1. **Impressum** (`/impressum`) - Gesetzlich vorgeschriebene Anbieterkennung mit Platzhaltern fur deine Daten (Name, Adresse, Kontakt, USt-IdNr. etc.)
2. **Datenschutzerklarung** (`/datenschutz`) - DSGVO-konforme Datenschutzseite mit Abschnitten zu: Verantwortlicher, Datenerhebung, Cookies, Zahlungsanbieter, Rechte der Betroffenen, EmailJS-Hinweis
3. **AGB** (`/agb`) - Allgemeine Geschaftsbedingungen mit Abschnitten zu: Geltungsbereich, Vertragsschluss, Preise, Zahlung, Lieferung, Widerrufsrecht, Gewahrleistung, Haftung

Alle drei Seiten verwenden das gleiche Layout wie die bestehenden Unterseiten (FloatingHeader, Footer, framer-motion Animationen).

### Weitere Anpassungen

- **Footer** (`src/components/Footer.tsx`): Die drei Links (`#`) werden auf die richtigen Routen (`/impressum`, `/datenschutz`, `/agb`) geandert und als React Router `Link`-Komponenten umgebaut
- **App.tsx**: Drei neue Routen hinzufugen
- **Shipping.tsx**: `support@rifacards.de` wird auf `info@rifacards.de` geandert (wurde beim letzten Update vergessen)

### Technische Details

**Neue Dateien:**
- `src/pages/Impressum.tsx`
- `src/pages/Datenschutz.tsx`
- `src/pages/AGB.tsx`

**Geanderte Dateien:**
- `src/App.tsx` - 3 neue Routen + Imports
- `src/components/Footer.tsx` - `<a href="#">` durch `<Link to="/...">` ersetzen
- `src/pages/Shipping.tsx` - E-Mail auf `info@rifacards.de` aktualisieren

### Wichtiger Hinweis

Die rechtlichen Texte werden mit **Platzhaltern** erstellt (z.B. `[Dein vollstandiger Name]`, `[Deine Strasse]`). Du musst diese spater mit deinen echten Daten ersetzen. Fur rechtsverbindliche Texte empfehle ich einen Anwalt oder einen Generator wie eRecht24.

