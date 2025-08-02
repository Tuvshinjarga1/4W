"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  Star,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/lib/data";
import UrgencyIndicator from "@/components/UrgencyIndicator";
import ReviewSection from "@/components/ReviewSection";
import type { ProductWithChat } from "@/lib/types";
import dynamic from "next/dynamic";

// Dynamic import ProductMap to avoid SSR issues
const ProductMap = dynamic(() => import("@/components/ProductMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-neutral-100 flex items-center justify-center">
      <div className="text-neutral-500">Газрын зураг уншиж байна...</div>
    </div>
  ),
});

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductWithChat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Бүтээгдэхүүн олдсонгүй:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-neutral-600 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          Уншиж байна...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">
            Бүтээгдэхүүн олдсонгүй
          </h1>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Нүүр хуудас руу буцах
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Ensure expiryDate is properly formatted as string
  const expiryDate =
    typeof product.expiryDate === "string"
      ? product.expiryDate
      : new Date(product.expiryDate as any).toISOString();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-semibold text-neutral-800 text-sm sm:text-base truncate">
            Бүтээгдэхүүний дэлгэрэнгүй
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <UrgencyIndicator expiryDate={expiryDate} />
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2">
                  {product.title}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 text-xs"
                >
                  {product.category}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">Тоо хэмжээ</p>
                <p className="font-semibold text-neutral-800">
                  {product.quantity}
                </p>
              </div>
            </div>

            <p className="text-neutral-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="truncate">{product.location}</span>
                </div>
                {product.coordinates && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const { lat, lng } = product.coordinates!;
                      const url = `https://www.google.com/maps?q=${lat},${lng}`;
                      window.open(url, "_blank");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 w-full sm:w-auto justify-center"
                  >
                    <Navigation className="w-3 h-3" />
                    Зам
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>
                  Дуусах огноо:{" "}
                  {new Date(product.expiryDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Package className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Боломжтой: {product.quantity}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm sm:text-lg">🧑‍💼</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-neutral-800 text-sm sm:text-base truncate">
                    {product.seller.name}
                  </p>
                  <p className="text-sm text-neutral-600">Борлуулагч</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Газрын зураг хэсэг */}
        {product.coordinates && (
          <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <h2 className="text-base sm:text-lg font-semibold text-neutral-800">
                  Байршил
                </h2>
              </div>
              <p className="text-sm text-neutral-600 mt-1 truncate">
                {product.location}
              </p>
            </div>
            <div className="h-64 sm:h-80">
              <ProductMap
                coordinates={product.coordinates}
                location={product.location}
              />
            </div>
          </div>
        )}

        {/* Review Section */}
        <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <h2 className="text-base sm:text-lg font-semibold text-neutral-800">
              Санал сэтгэгдэл
            </h2>
          </div>
          <ReviewSection productId={id} />
        </div>
      </main>
    </div>
  );
}
