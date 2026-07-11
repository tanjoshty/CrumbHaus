import { urlForImage } from "@/lib/sanity/image";
import { Product } from "@/types/sanity.types";
import { Image } from "next-sanity/image";
import Link from 'next/link';

export function ProductCard({product}: {product: Product}) {
  const imageUrl = product.images?.length
    ? urlForImage(product.images[0]).width(600).height(480).fit("crop").url()
    : null

  const startingPrice = product.sizes?.length
    ? Math.min(...product.sizes.map((size) => size.price ?? Infinity))
    : undefined

  return (
    <Link href={`/products/${product.slug?.current}`}>
      <div
        className="h-full flex flex-col border border-cream-border bg-cream hover:border-cobalt transition-colors cursor-pointer">
        <div className="relative aspect-[5/4] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <Image src={imageUrl} alt={product.name ?? ""} fill className="object-cover" />
          ) : (
            <span className={`text-[11px] font-medium tracking-[0.15em] uppercase`}>
              Image Placeholder
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-cobalt">
              {product.tag}
            </span>
            {startingPrice !== undefined && (
              <span className="font-display font-extrabold text-xl text-burgundy">
                From ${startingPrice}
              </span>
            )}
          </div>
          <h3 className="font-display font-black text-[30px] text-ink uppercase mb-2 leading-none">
            {product.name}
          </h3>
          <p className="text-[13px] font-light leading-[1.65] text-ink/70 mb-[18px]">
            {product.blurb}
          </p>
          <button className="w-full bg-cobalt text-cream text-[11px] font-medium tracking-[0.12em] uppercase py-3 cursor-pointer mt-auto">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}