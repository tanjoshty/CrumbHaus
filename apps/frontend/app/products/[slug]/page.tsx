import { ProductDisplay } from "@/components/products/ProductDisplay";

export default async function ProductDisplayPage(props: PageProps<'/products/[slug]'>) {
  const params = await props.params
  const safeSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug || ''
  return (
    <ProductDisplay slug={safeSlug}/>
  )
}