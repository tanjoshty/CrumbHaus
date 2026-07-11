'use client'
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Cart } from "./Cart";

export function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, total, removeItem } = useCartStore();
  const router = useRouter();
  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  }

  return (
    <Cart 
      open={isCartOpen}
      onOpenChange={(open) => {if (!open) closeCart()}}
      items={cartItems}
      total={total}
      onRemoveItem={removeItem}
      onCheckout={handleCheckout}
    />
  )
}