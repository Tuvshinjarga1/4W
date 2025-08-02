import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <h3 className="text-lg font-medium text-neutral-800 mb-2">
          Бүтээгдэхүүн байхгүй байна
        </h3>
        <p className="text-neutral-600 text-sm">
          Танай орон нутагт анхны хүнс хуваалцагч болоорой!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[40%] lg:auto-cols-[30%] gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 px-1">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
