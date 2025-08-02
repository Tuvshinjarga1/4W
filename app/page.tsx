import { Suspense } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import { getProducts } from "@/lib/data";

export default async function HomePage() {
  const rawProducts = await getProducts();

  const products = rawProducts.map((product: any) => ({
    ...product,
    seller: product["seller "] ?? product.seller,
    expiryDate: new Date(product.expiryDate?.seconds * 1000),
    title: product.title?.replace(/^"|"$/g, "").trim(),
  }));
  console.log("Products:", products);
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
            Боломжтой бүтээгдэхүүн
          </h1>
          <p className="text-neutral-600 text-sm">
            Танай орон нутагт хүнсний хог хаягдлыг бууруулахад туслаарай
          </p>
        </div>

        <FilterBar />

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid products={products} />
        </Suspense>
      </main>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-3 sm:p-4 shadow-sm animate-pulse"
        >
          <div className="w-full h-32 sm:h-48 bg-neutral-200 rounded-lg mb-3"></div>
          <div className="h-4 bg-neutral-200 rounded mb-2"></div>
          <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
