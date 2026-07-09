import { Product, Slug } from '@/types/sanity.types';
import { ProductContent } from './ProductContent'
import { ProductVariants } from './ProductVariants'

interface Props {
  flavours?: string[];
  description?: Product["description"];
  hasCustomisation?: boolean;
  name?: string;
  slug?: Slug;
  colours?: Product["colours"];
  id?: Product["_id"];
}

export function ProductDetails({
  flavours,
  description,
  hasCustomisation,
  name,
  slug,
  colours,
  id,
}: Props) {
  return (
    <div className="px-14 py-14 flex flex-col gap-4">
      <ProductContent
        description={description}
        name={name}
      />
      <ProductVariants
        flavours={flavours}
        hasCustomisation={hasCustomisation}
        colours={colours}
        id={id}
      />
    </div>
  )
}