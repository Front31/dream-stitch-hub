import display151 from '@/assets/products/151-display.png';
import svEtb from '@/assets/products/sv-etb.png';
import obsidianFlames from '@/assets/products/obsidian-flames.png';
import paldeaEvolved from '@/assets/products/paldea-evolved.png';
import crownZenith from '@/assets/products/crown-zenith.png';
import temporalForces from '@/assets/products/temporal-forces.png';

export interface Product {
  id: string;
  handle: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  productType: 'Booster Display' | 'Elite Trainer Box' | 'Special Collection' | 'Booster Bundle';
  language: 'EN' | 'DE' | 'JP';
  edition: string;
  sealed: boolean;
  releaseYear: number;
  boosterCount: number;
  flavorText: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    handle: '151-booster-display',
    name: '151 Booster Display',
    image: display151,
    price: 189.99,
    compareAtPrice: 219.99,
    productType: 'Booster Display',
    language: 'JP',
    edition: 'Pokémon 151',
    sealed: true,
    releaseYear: 2023,
    boosterCount: 20,
    flavorText: 'Erlebe die Magie der ersten Generation. Original 151 Pokémon in atemberaubenden Illustrationen.',
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    handle: 'scarlet-violet-etb',
    name: 'Scarlet & Violet ETB',
    image: svEtb,
    price: 54.99,
    productType: 'Elite Trainer Box',
    language: 'EN',
    edition: 'Scarlet & Violet Base',
    sealed: true,
    releaseYear: 2023,
    boosterCount: 9,
    flavorText: 'Der perfekte Einstieg in die Paldea-Region. Enthält Sleeves, Würfel und mehr.',
    inStock: true,
    isFeatured: true,
  },
  {
    id: '3',
    handle: 'obsidian-flames-display',
    name: 'Obsidian Flames Display',
    image: obsidianFlames,
    price: 159.99,
    productType: 'Booster Display',
    language: 'EN',
    edition: 'Obsidian Flames',
    sealed: true,
    releaseYear: 2023,
    boosterCount: 36,
    flavorText: 'Die Flammen der Dunkelheit erwachen. Jage das mächtige Tera-Glurak ex.',
    inStock: true,
  },
  {
    id: '4',
    handle: 'paldea-evolved-display',
    name: 'Paldea Evolved Display',
    image: paldeaEvolved,
    price: 149.99,
    productType: 'Booster Display',
    language: 'EN',
    edition: 'Paldea Evolved',
    sealed: true,
    releaseYear: 2023,
    boosterCount: 36,
    flavorText: 'Evolution erreicht neue Höhen. Entdecke die Geheimnisse von Paldea.',
    inStock: true,
    isNew: true,
  },
  {
    id: '5',
    handle: 'crown-zenith-etb',
    name: 'Crown Zenith ETB',
    image: crownZenith,
    price: 69.99,
    compareAtPrice: 79.99,
    productType: 'Elite Trainer Box',
    language: 'EN',
    edition: 'Crown Zenith',
    sealed: true,
    releaseYear: 2023,
    boosterCount: 10,
    flavorText: 'Der krönende Abschluss einer Ära. Legendäre Galarian-Formen warten.',
    inStock: true,
    isFeatured: true,
  },
  {
    id: '6',
    handle: 'temporal-forces-display',
    name: 'Temporal Forces Display',
    image: temporalForces,
    price: 169.99,
    productType: 'Booster Display',
    language: 'EN',
    edition: 'Temporal Forces',
    sealed: true,
    releaseYear: 2024,
    boosterCount: 36,
    flavorText: 'Die Zeit ist auf deiner Seite. Ancient und Future Pokémon kollidieren.',
    inStock: true,
    isNew: true,
  },
];

export const getProductByHandle = (handle: string): Product | undefined => {
  return products.find(p => p.handle === handle);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};
