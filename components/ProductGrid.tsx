import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl sm:text-2xl">📦</span>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-neutral-800 mb-2">
          Бүтээгдэхүүн байхгүй байна
        </h3>
        <p className="text-neutral-600 text-sm">
          Танай орон нутагт анхны хүнс хуваалцагч болоорой!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
