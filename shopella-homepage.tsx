import Header from "./components/header"
import Layout from "./components/layout"
import HeroSection from "./components/hero-section"
import AdsBanner from "./components/ads-banner"
import ProductGrid from "./components/product-grid"
import Footer from "./components/footer"
import CategorySection from "./components/category-section"
import ProductSections from "./components/product-sections"
import AdsBanner2 from "./components/ads-banner2"

export default function ShopellaHomepage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Layout>
        <HeroSection />
        <AdsBanner />
        <CategorySection />
        <ProductGrid />
        <ProductSections />
        <AdsBanner2 />
      </Layout>
      <Footer />
    </div>
  )
}
