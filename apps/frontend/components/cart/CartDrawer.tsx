'use client'
import { useCartStore } from "@/store/useCartStore";
import { Cart } from "./Cart";

export function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, total, removeItem } = useCartStore();

  return (
    <Cart 
      open={isCartOpen}
      onOpenChange={(open) => {if (!open) closeCart()}}
      items={cartItems}
      total={total}
      onRemoveItem={removeItem}
    />
  )
}