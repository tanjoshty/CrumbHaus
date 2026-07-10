'use client'

import { createContext, useContext, useReducer, type ReactNode } from 'react'
import { Product } from '@/types/sanity.types'

type Size = NonNullable<Product['sizes']>[number]

interface PurchaseState {
  selectedSizeLabel?: string
  selectedColour?: string
  selectedFlavour?: string
  date?: Date
  notes?: string
}

type PurchaseAction =
  | { type: 'SELECT_SIZE'; label: string }
  | { type: 'SELECT_COLOUR'; label: string }
  | { type: 'SELECT_FLAVOUR'; flavour: string }
  | { type: 'SET_DATE'; date: Date | undefined }
  | { type: 'SET_NOTES'; notes: string }

function purchaseReducer(state: PurchaseState, action: PurchaseAction): PurchaseState {
  switch (action.type) {
    case 'SELECT_SIZE':
      return { ...state, selectedSizeLabel: action.label }
    case 'SELECT_COLOUR':
      return { ...state, selectedColour: action.label }
    case 'SELECT_FLAVOUR':
      return { ...state, selectedFlavour: action.flavour }
    case 'SET_DATE':
      return { ...state, date: action.date }
    case 'SET_NOTES':
      return { ...state, notes: action.notes }
    default:
      return state
  }
}

function initState(sizes?: Product['sizes']): PurchaseState {
  return {
    selectedSizeLabel: sizes?.[0]?.label,
    selectedColour: undefined,
    selectedFlavour: undefined,
    date: undefined,
    notes: '',
  }
}

interface ProductPurchaseContextValue {
  sizes?: Product['sizes']
  selectedSize?: Size
  selectSize: (label: string) => void
  colours?: Product['colours']
  selectedColour?: string
  selectColour: (label: string) => void
  flavours?: Product['flavors']
  selectedFlavour?: string
  selectFlavour: (flavour: string) => void
  date?: Date
  setDate: (date: Date | undefined) => void
  notes?: string
  setNotes: (notes: string) => void
}

const ProductPurchaseContext = createContext<ProductPurchaseContextValue | null>(null)

interface ProviderProps {
  sizes?: Product['sizes']
  flavours?: Product['flavors']
  colours?: Product['colours']
  children: ReactNode
}

export function ProductPurchaseProvider({ sizes, colours, flavours, children }: ProviderProps) {
  const [state, dispatch] = useReducer(purchaseReducer, sizes, initState)
  const selectedSize = sizes?.find((size) => size.label === state.selectedSizeLabel)

  const value: ProductPurchaseContextValue = {
    sizes,
    selectedSize,
    selectSize: (label) => dispatch({ type: 'SELECT_SIZE', label }),
    colours,
    selectedColour: state.selectedColour,
    selectColour: (label) => dispatch({ type: 'SELECT_COLOUR', label }),
    flavours,
    selectedFlavour: state.selectedFlavour,
    selectFlavour: (flavour) => dispatch({ type: 'SELECT_FLAVOUR', flavour }),
    date: state.date,
    setDate: (date) => dispatch({ type: 'SET_DATE', date }),
    notes: state.notes,
    setNotes: (notes) => dispatch({ type: 'SET_NOTES', notes }),
  }

  return (
    <ProductPurchaseContext.Provider value={value}>
      {children}
    </ProductPurchaseContext.Provider>
  )
}

export function useProductPurchase() {
  const context = useContext(ProductPurchaseContext)
  if (!context) {
    throw new Error('useProductPurchase must be used within a ProductPurchaseProvider')
  }
  return context
}
