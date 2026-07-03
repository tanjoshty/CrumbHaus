import { Product } from "./ProductGrid";

export function ProductCard({product}: {product: Product}) {
  return (
    <div
      className="border border-cream-border bg-cream hover:border-cobalt transition-colors cursor-pointer">
      <div className={`aspect-[5/4] ${product.imgBg} flex items-center justify-center`}>
        <span className={`text-[11px] font-medium tracking-[0.15em] uppercase ${product.imgText}`}>
          Image Placeholder
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-cobalt">
            {product.tag}
          </span>
          <span className="font-display font-extrabold text-xl text-ink">
            {product.price}
          </span>
        </div>
        <h3 className="font-display font-black text-[30px] text-ink uppercase mb-2 leading-none">
          {product.name}
        </h3>
        <p className="text-[13px] font-light leading-[1.65] text-ink/70 mb-[18px]">
          {product.desc}
        </p>
        <button className="w-full bg-cobalt text-cream text-[11px] font-medium tracking-[0.12em] uppercase py-3 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  )
}