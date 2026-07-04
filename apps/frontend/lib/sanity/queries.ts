import { defineQuery } from 'next-sanity'

export const PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && active]`
)
export const PRODUCT_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]`
)