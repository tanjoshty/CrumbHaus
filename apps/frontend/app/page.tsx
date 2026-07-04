
import { HomeHero } from '@/components/content/HomeHero'
import { FeatureList } from '@/components/content/FeatureList'
import { MediaAndText } from '@/components/content/MediaAndText'
import { ProductGrid } from '@/components/products/ProductGrid'
 
export default function CrumbHaus() {
  return (
    <div className="font-sans bg-cream text-ink min-h-screen">
      <HomeHero />
      <FeatureList />
      <ProductGrid title="Best Sellers" link="/products"/>
      <MediaAndText />
    </div>
  )
}