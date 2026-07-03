export interface Product {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

// Stub data until the DB is wired up
const products: Product[] = [
  {
    id: '1',
    name: 'Lemon Drizzle',
    description: 'Bright, zesty sponge with a crackle-top glaze and a sharp citrus kick.',
    active: true,
  },
  {
    id: '2',
    name: 'Chocolate Ganache',
    description: 'Dark chocolate layers with silky ganache filling and a glossy finish.',
    active: true,
  },
  {
    id: '3',
    name: 'Carrot & Walnut',
    description: 'Spiced carrot cake with cream cheese frosting and candied walnuts.',
    active: true,
  },
];

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  return products.find((p) => p.id === productId)
}
