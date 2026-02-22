# Migration zu Shopify Hydrogen

## Übersicht
Dein aktuelles React/Vite-Projekt wird zu einem Shopify Hydrogen-Projekt portiert. Hydrogen basiert auf React + Remix und nutzt die Shopify Storefront API.

---

## Schritt-für-Schritt Anleitung

### 1. Hydrogen-Projekt erstellen

```bash
npm create @shopify/hydrogen@latest -- --template demo-store
cd dein-projekt-name
npm install
```

### 2. Abhängigkeiten installieren

```bash
npm install framer-motion lucide-react zustand sonner tailwind-merge class-variance-authority clsx tailwindcss-animate
npm install @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-select
```

### 3. Dateien übertragen

#### Direkt kopierbar (keine Änderungen nötig):
- `src/components/ui/*` → `app/components/ui/*`
- `src/components/FeaturedSection.tsx` → `app/components/FeaturedSection.tsx`
- `src/components/Footer.tsx` → `app/components/Footer.tsx`
- `src/components/HeroSection.tsx` → `app/components/HeroSection.tsx`
- `src/components/TrustSection.tsx` → `app/components/TrustSection.tsx`
- `src/assets/*` → `app/assets/*`
- `src/index.css` → `app/styles/index.css`

#### Anpassen nötig:
- **FloatingHeader.tsx** – `react-router-dom` → `@remix-run/react`
- **CartDrawer.tsx** – Zustand → Hydrogen Cart API
- **Routing** – React Router → Remix File-Based Routing
- **Shopify API** – `shopify.ts` löschen → Hydrogen SDK nutzen

### 4. Routing umstellen

```
app/routes/
├── _index.tsx             → Homepage
├── collections._index.tsx → Sammlung
├── products.$handle.tsx   → Produktseite
├── about.tsx              → Über uns
├── faq.tsx                → FAQ
├── contact.tsx            → Kontakt
├── shipping.tsx           → Versand
```

**Beispiel Route:**
```tsx
import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';

export async function loader({ context }) {
  const { products } = await context.storefront.query(QUERY);
  return json({ products });
}

export default function Page() {
  const { products } = useLoaderData();
  return <FeaturedSection products={products} />;
}
```

### 5. Cart umstellen

Zustand Store + eigene Mutationen → Hydrogen Cart API:

```tsx
import { CartForm, useCart } from '@shopify/hydrogen';

function AddToCartButton({ variantId }) {
  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd}>
      <input type="hidden" name="lines" value={JSON.stringify([
        { merchandiseId: variantId, quantity: 1 }
      ])} />
      <button type="submit">In den Warenkorb</button>
    </CartForm>
  );
}
```

### 6. Deployen

```bash
# Shopify Oxygen (empfohlen)
shopify hydrogen deploy

# Oder Vercel/Netlify
npm run build
```

---

## Was sich ändert vs. was bleibt

| Ändert sich | Bleibt gleich |
|-------------|--------------|
| Routing → Remix | UI-Komponenten (shadcn) |
| Shopify API → Hydrogen SDK | Tailwind + Design Tokens |
| Cart → Hydrogen Cart API | Framer Motion |
| SPA → SSR | Bilder & Assets |
| Hosting → Oxygen | Gesamtes Design |
