import { client } from '@/lib/sanity/client'
import { PRODUCTS_QUERY } from '@/lib/sanity/queries'
import { ProductCard } from "./ProductCard"
import { Product } from '@/types/sanity.types';


export async function ProductGrid({title, link = "#"}: {title: string, link?: string}) {
  const products = await client.fetch(PRODUCTS_QUERY);

  return (
    <section className="px-12 py-[72px] bg-cream-light">
      <div className="flex justify-between items-baseline mb-10">
        <h2 className="font-display font-black text-[52px] text-cobalt uppercase tracking-[0.02em]">
          {title}
        </h2>
        <a href={link} className="text-[12px] font-medium tracking-[0.12em] uppercase text-cobalt no-underline">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {products.map((p: Product) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </div>
    </section>
  )
}