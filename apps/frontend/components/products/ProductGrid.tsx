import { ProductCard } from "./ProductCard"

export type Product = {
  name: string,
  tag: string,
  price: string,
  desc: string,
  imgBg: string,
  imgText: string,
}

export function ProductGrid() {
  const products: Product[] = [
    {
      name: 'Lemon Drizzle',
      tag: 'Fan Favourite',
      price: '$65',
      desc: 'Bright, zesty sponge with a crackle-top glaze and a sharp citrus kick.',
      imgBg: 'bg-cobalt',
      imgText: 'text-cream/20',
    },
    {
      name: 'Chocolate Ganache',
      tag: 'New',
      price: '$75',
      desc: 'Dark chocolate layers with silky ganache filling and a glossy finish.',
      imgBg: 'bg-[#C8BA92]',
      imgText: 'text-ink/20',
    },
    {
      name: 'Carrot & Walnut',
      tag: 'Seasonal',
      price: '$70',
      desc: 'Spiced carrot cake with cream cheese frosting and candied walnuts.',
      imgBg: 'bg-cobalt-dark',
      imgText: 'text-cream/20',
    },
  ]
  return (
    <section className="px-12 py-[72px] bg-cream-light">
      <div className="flex justify-between items-baseline mb-10">
        <h2 className="font-display font-black text-[52px] text-cobalt uppercase tracking-[0.02em]">
          This Week's Bakes
        </h2>
        <a href="#" className="text-[12px] font-medium tracking-[0.12em] uppercase text-cobalt no-underline">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </div>
    </section>
  )
}