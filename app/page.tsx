"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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

        setAllProducts(products);
        setFilteredProducts(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Бүтээгдэхүүн уншихад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-neutral-600">Уншиж байна...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl">⚠️</span>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-neutral-800 mb-2">
              Алдаа гарлаа
            </h3>
            <p className="text-neutral-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Дахин оролдох
            </button>
          </div>
        </main>
      </div>
    );
  }

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
          {allProducts.length > 0 && (
            <p className="text-xs text-neutral-500 mt-1">
              Нийт {allProducts.length} бүтээгдэхүүн олдлоо
              {filteredProducts.length !== allProducts.length && (
                <span className="ml-2">
                  (Шүүлтүүрээр {filteredProducts.length} харуулж байна)
                </span>
              )}
            </p>
          )}
        </div>

        <FilterBar products={allProducts} onFilterChange={handleFilterChange} />

        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
