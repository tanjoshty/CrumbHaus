export interface CartState {
  total: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
}

export interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export type CartStore = CartState & CartActions;

export interface CartItem {
  lineId: string;
  name: string;
  productId: string;
  price: number;
  variations: CartItemVariations;
  deliveryDate: string;
  notes: string;
}

export interface CartItemVariations {
  size: string;
  flavour: string;
  colour?: string;
}