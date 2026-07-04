import { Product } from "@/types/sanity.types";

interface Props {
  description?: Product["description"];
  name?: string;
  price?: number
}

export function ProductContent({
  description,
  name,
  price,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink/60">
          <a href="#" className="hover:text-cobalt transition-colors">Cakes</a>
          <span className="mx-2">›</span>
          Ribbon Cake
        </p>
 
        {/* Title + Price */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-cobalt mb-3">
            Celebration Cake
          </p>
          <div className="flex justify-between items-start">
            <h1 className="font-display font-black text-[64px] text-ink uppercase leading-[0.9] tracking-[-0.01em]">
              Ribbon<br />Cake
            </h1>
            <div className="text-right mt-1">
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink/60 mb-1">From</p>
              <p className="font-display font-black text-[42px] text-ink leading-none">$65</p>
            </div>
          </div>
        </div>
 
        {/* Description */}
        <p className="text-[15px] font-light leading-[1.8] text-ink/70 max-w-[440px]">
          Our signature ribbon cake — elegant, timeless, and made entirely to
          order. Each one is hand-decorated with a classic ribbon finish in
          your choice of colour, filled with your favourite flavour.
        </p>
    </div>
  )
}