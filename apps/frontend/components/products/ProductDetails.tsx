import { Product, Slug } from '@/types/sanity.types';
import { ProductContent } from './ProductContent'
import { ProductVariants } from './ProductVariants'

interface Props {
  flavours?: string[];
  description?: Product["description"];
  hasCustomisation?: boolean;
  name?: string;
  sizes?: Product["sizes"];
  slug?: Slug;
  price?: number;
}

export function ProductDetails({
  flavours,
  description,
  hasCustomisation,
  name,
  sizes,
  slug,
  price,
}: Props) {
  return (
    <div className="px-14 py-14 flex flex-col gap-4">
      <ProductContent 
        description={description}
        name={name}
        price={price}
      />
      <ProductVariants 
        flavours={flavours}
        hasCustomisation={hasCustomisation}
        sizes={sizes}
      />
    </div>
  )
}