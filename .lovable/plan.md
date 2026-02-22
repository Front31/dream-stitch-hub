

## EmailJS Integration & E-Mail-Aktualisierung

### Was wird gemacht

1. **EmailJS einbinden** - Das Kontaktformular wird mit EmailJS verbunden, sodass bei jeder Absendung:
   - Du eine Benachrichtigung per E-Mail erhaltst (Template: `template_ngwv4wu`)
   - Der Kunde eine Bestatigungs-E-Mail bekommt (Template: `template_j6siluo`)

2. **E-Mail-Adresse aktualisieren** - Uberall auf der Webseite wird `support@rifacards.de` durch `info@rifacards.de` ersetzt:
   - Kontaktseite
   - Footer
   - Alle weiteren Stellen

### Technische Details

**Dateien die geandert werden:**

- `src/pages/Contact.tsx` - EmailJS SDK importieren, `handleSubmit` mit `emailjs.send()` fur beide Templates verbinden, E-Mail auf `info@rifacards.de` andern
- `src/components/Footer.tsx` - E-Mail-Adresse auf `info@rifacards.de` aktualisieren

**EmailJS Konfiguration (offentliche Schluessel, sicher im Code):**
- Service ID: `service_nqe86jm`
- Template Benachrichtigung: `template_ngwv4wu`
- Template Kundenbestatigung: `template_j6siluo`
- Public Key: `Dm-DfN6Xpxkip75sw`

**Ablauf beim Formular-Versand:**
1. Kunde fullt Formular aus und klickt "Nachricht senden"
2. EmailJS sendet E-Mail 1 an dich (info@rifacards.de) mit den Formulardaten
3. EmailJS sendet E-Mail 2 an den Kunden als Bestatigung
4. Kunde sieht Erfolgsmeldung auf der Webseite

