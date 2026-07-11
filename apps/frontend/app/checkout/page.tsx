import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { CartItem } from "@/types/cart.types"

// Placeholder data so the page renders standalone. Replace with real cart data
// from useCartStore when you wire this up (you'll likely make the page — or a
// small client wrapper — read the store and pass items/total + an onPlaceOrder).
const MOCK_ITEMS: CartItem[] = [
  {
    lineId: "1",
    name: "Ruffle Cake",
    productId: "mock-1",
    price: 85,
    variations: { size: "8 Inch", flavour: "Vanilla", colour: "Cobalt" },
    deliveryDate: "Sat, 19 Jul 2026",
    notes: "Happy 30th Sarah",
  },
  {
    lineId: "2",
    name: "Oval Berry Cake",
    productId: "mock-2",
    price: 65,
    variations: { size: "6 Inch", flavour: "Lemon" },
    deliveryDate: "Sun, 27 Jul 2026",
    notes: "",
  },
]

const MOCK_TOTAL = MOCK_ITEMS.reduce((sum, item) => sum + item.price, 0)

export default function CheckoutPage() {
  return <CheckoutForm items={MOCK_ITEMS} total={MOCK_TOTAL} />
}
