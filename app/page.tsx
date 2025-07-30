import { Suspense } from "react"
import Header from "@/components/Header"
import ProductGrid from "@/components/ProductGrid"
import FilterBar from "@/components/FilterBar"
import { getProducts } from "@/lib/data"

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Available Products</h1>
          <p className="text-neutral-600 text-sm">Help reduce food waste in your community</p>
        </div>

        <FilterBar />

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid products={products} />
        </Suspense>
      </main>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
          <div className="w-full h-48 bg-neutral-200 rounded-lg mb-3"></div>
          <div className="h-4 bg-neutral-200 rounded mb-2"></div>
          <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}
