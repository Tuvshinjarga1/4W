import { Suspense } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import { getProducts } from "@/lib/data";

export default async function HomePage() {
  try {
    const rawProducts = await getProducts();
    console.log("Raw products from Firebase:", rawProducts);

    const products = rawProducts.map((product: any) => ({
      ...product,
      seller: product["seller "] ?? product.seller,
      expiryDate: new Date(product.expiryDate?.seconds * 1000),
      title: product.title?.replace(/^"|"$/g, "").trim(),
    }));

    console.log("Processed products:", products);
    console.log("Number of products:", products.length);

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
            {products.length > 0 && (
              <p className="text-xs text-neutral-500 mt-1">
                Нийт {products.length} бүтээгдэхүүн олдлоо
              </p>
            )}
          </div>

          <FilterBar />

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
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

          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl">⚠️</span>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-neutral-800 mb-2">
              Алдаа гарлаа
            </h3>
            <p className="text-neutral-600 text-sm">
              Бүтээгдэхүүн уншихад алдаа гарлаа. Дахин оролдоно уу.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Дахин оролдох
            </button>
          </div>
        </main>
      </div>
    );
  }
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
