import { client } from "@/lib/sanity/client";
import { PRODUCT_QUERY } from "@/lib/sanity/queries";
import { ProductGallery } from './ProductGallery';
import { ProductDetails } from "./ProductDetails";
import { Product } from "@/types/sanity.types";
import { ProductPurchaseProvider } from "./ProductPurchaseContext";

interface Props {
  slug: string;
}
export async function ProductDisplay({ slug }: Props) {
  const product = await client.fetch(PRODUCT_QUERY, { slug }) as Product;

  return (
    <ProductPurchaseProvider sizes={product?.sizes}>
      <div className="font-sans bg-cream text-ink min-h-screen grid grid-cols-2">

        {/* ── LEFT — Image ───────────────────────────────── */}
        <ProductGallery images={product?.images} tag={product?.tag} />

        {/* ── RIGHT — Details ────────────────────────────── */}
        <ProductDetails
          flavours={product?.flavors}
          description={product?.description}
          hasCustomisation={product?.hasCustomisation}
          name={product?.name}
          slug={product?.slug}
          colours={product.colours}
          id={product._id}
        />
      </div>
    </ProductPurchaseProvider>
  )
}