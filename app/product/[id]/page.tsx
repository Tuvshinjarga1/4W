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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-600">Уншиж байна...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-neutral-800 mb-2">
            Бүтээгдэхүүн олдсонгүй
          </h1>
          <Link href="/">
            <Button variant="outline">Нүүр хуудас руу буцах</Button>
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
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-semibold text-neutral-800">
            Бүтээгдэхүүний дэлгэрэнгүй
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 right-3">
              <UrgencyIndicator expiryDate={expiryDate} />
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-neutral-800 mb-2">
                  {product.title}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
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

            <p className="text-neutral-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>{product.location}</span>
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
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    Зам
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>
                  Дуусах огноо:{" "}
                  {new Date(product.expiryDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Package className="w-4 h-4 text-green-600" />
                <span>Боломжтой: {product.quantity}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🧑‍💼</span>
                </div>
                <div>
                  <p className="font-medium text-neutral-800">
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
          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-neutral-800">
                  Байршил
                </h2>
              </div>
              <p className="text-sm text-neutral-600 mt-1">
                {product.location}
              </p>
            </div>
            <div className="h-80">
              <ProductMap
                coordinates={product.coordinates}
                location={product.location}
              />
            </div>
          </div>
        )}

        {/* Review Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-neutral-800">
              Санал сэтгэгдэл
            </h2>
          </div>
          <ReviewSection productId={id} />
        </div>
      </main>
    </div>
  );
}
