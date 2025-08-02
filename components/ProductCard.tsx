"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import UrgencyIndicator from "./UrgencyIndicator";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleNavigateToLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Хэрэв бүтээгдэхүүнд координат байвал түүнийг ашиглах
    if (product.coordinates) {
      const { lat, lng } = product.coordinates;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
    } else {
      // Хэрэв координат байхгүй бол байршлын нэрээр хайх
      const searchQuery = encodeURIComponent(product.location);
      const url = `https://www.google.com/maps/search/${searchQuery}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-32 sm:h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="bg-white/90 text-neutral-800 text-xs"
            >
              {product.category}
            </Badge>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-1 text-sm sm:text-base">
            {product.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="space-y-1 mb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-1 text-xs text-neutral-600">
                <MapPin className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span className="truncate">{product.location}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleNavigateToLocation}
                className="h-6 px-2 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 w-full sm:w-auto justify-center"
              >
                <Navigation className="w-3 h-3 mr-1" />
                Зам
              </Button>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-600">
              <Calendar className="w-3 h-3 text-green-600 flex-shrink-0" />
              <span>
                Дуусах огноо:{" "}
                {new Date(product.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs">🧑‍💼</span>
              </div>
              <span className="text-xs text-neutral-600 truncate">
                {product.seller?.name ?? "Тодорхойгүй борлуулагч"}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-800 flex-shrink-0">
              Тоо: {product.quantity}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
