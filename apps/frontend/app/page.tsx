import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HomeHero } from '@/components/content/HomeHero'
import { FeatureList } from '@/components/content/FeatureList'
import { MediaAndText } from '@/components/content/MediaAndText'
import { ProductGrid } from '@/components/products/ProductGrid'
 
export default function CrumbHaus() {
  return (
    <div className="font-sans bg-cream text-ink min-h-screen">
      <Header />
      <HomeHero />
      <FeatureList />
      <ProductGrid />
      <MediaAndText />
      <Footer />
    </div>
  )
}