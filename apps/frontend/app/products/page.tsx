import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductGrid } from '@/components/products/ProductGrid'
 
export default function ProductListingPage() {
  return (
    <div className="font-sans bg-cream text-ink min-h-screen">
      <Header />
      <ProductGrid />
      <Footer />
    </div>
  )
}