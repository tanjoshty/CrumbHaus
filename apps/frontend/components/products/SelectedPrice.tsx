'use client'

import { useProductPurchase } from './ProductPurchaseContext'

export function SelectedPrice() {
  const { selectedSize } = useProductPurchase()

  return (
    <div className="text-right mt-1">
      <p className="font-display font-black text-[42px] text-burgundy leading-none">
        ${selectedSize?.price}
      </p>
    </div>
  )
}
