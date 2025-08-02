"use client";

import { useState, useEffect } from "react";
import {
  Filter,
  Calendar,
  Package,
  MapPin,
  Crosshair,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/types";

interface FilterBarProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

export default function FilterBar({
  products,
  onFilterChange,
}: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const categories = [
    "Жимс",
    "Ногоо",
    "Сүүн бүтээгдэхүүн",
    "Талх",
    "Мах",
    "Бусад",
  ];
  const urgencyLevels = [
    "Өнөөдөр дуусна",
    "1-3 хоногт дуусна",
    "1 долоо хоног+ дуусна",
  ];

  // Шүүлтүүр ашиглан бүтээгдэхүүнүүдийг шүүх
  const filterProducts = () => {
    let filteredProducts = [...products];

    // Ангилал болон яаралтай байдлын шүүлтүүр
    if (activeFilters.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        // Ангилал шүүлтүүр
        const categoryMatch =
          categories.includes(product.category) &&
          activeFilters.includes(product.category);

        // Яаралтай байдлын шүүлтүүр
        const expiryDate = new Date(product.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        let urgencyMatch = false;
        if (activeFilters.includes("Өнөөдөр дуусна")) {
          urgencyMatch = urgencyMatch || daysUntilExpiry <= 0;
        }
        if (activeFilters.includes("1-3 хоногт дуусна")) {
          urgencyMatch =
            urgencyMatch || (daysUntilExpiry > 0 && daysUntilExpiry <= 3);
        }
        if (activeFilters.includes("1 долоо хоног+ дуусна")) {
          urgencyMatch = urgencyMatch || daysUntilExpiry > 3;
        }

        return categoryMatch || urgencyMatch;
      });
    }

    // Байршлын шүүлтүүр
    if (locationFilter.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    onFilterChange(filteredProducts);
  };

  // Шүүлтүүр өөрчлөгдөх үед автоматаар шүүх
  useEffect(() => {
    filterProducts();
  }, [activeFilters, locationFilter, products]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const getCurrentLocation = () => {
    setIsLoadingGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationFilter("Одоогийн байршил");
          setIsLoadingGPS(false);
        },
        (error) => {
          console.error("GPS алдаа:", error);
          setIsLoadingGPS(false);
          alert("GPS байршил авах боломжгүй байна.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      alert("Таны төхөөрөмж GPS-д дэмжлэг үзүүлдэггүй байна.");
      setIsLoadingGPS(false);
    }
  };

  const clearLocationFilter = () => {
    setLocationFilter("");
    setUserLocation(null);
  };

  const navigateToUserLocation = () => {
    if (userLocation) {
      const { lat, lng } = userLocation;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    clearLocationFilter();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-neutral-600" />
        <span className="text-sm font-medium text-neutral-700">Шүүлтүүр</span>
        {(activeFilters.length > 0 || locationFilter) && (
          <Badge variant="secondary" className="text-xs">
            {activeFilters.length + (locationFilter ? 1 : 0)} идэвхтэй
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {/* Байршлын шүүлтүүр */}
        <div>
          <p className="text-xs text-neutral-600 mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Байршил
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Байршил хайх..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoadingGPS}
              className="flex items-center gap-1"
            >
              <Crosshair className="w-4 h-4" />
              {isLoadingGPS ? "Хайж байна..." : "GPS"}
            </Button>
          </div>
          {userLocation && (
            <div className="mt-2 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="text-xs bg-green-100 text-green-700"
              >
                📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={navigateToUserLocation}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Navigation className="w-3 h-3" />
                Зам
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearLocationFilter}
                className="text-xs text-neutral-500 hover:text-neutral-700"
              >
                Арилгах
              </Button>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs text-neutral-600 mb-2 flex items-center gap-1">
            <Package className="w-3 h-3" />
            Ангилал
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  activeFilters.includes(category) ? "default" : "secondary"
                }
                className={`cursor-pointer text-xs ${
                  activeFilters.includes(category)
                    ? "bg-green-600 hover:bg-green-700"
                    : "hover:bg-neutral-200"
                }`}
                onClick={() => toggleFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-neutral-600 mb-2 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Яаралтай байдал
          </p>
          <div className="flex flex-wrap gap-2">
            {urgencyLevels.map((level) => (
              <Badge
                key={level}
                variant={
                  activeFilters.includes(level) ? "default" : "secondary"
                }
                className={`cursor-pointer text-xs ${
                  activeFilters.includes(level)
                    ? "bg-green-600 hover:bg-green-700"
                    : "hover:bg-neutral-200"
                }`}
                onClick={() => toggleFilter(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {(activeFilters.length > 0 || locationFilter) && (
        <div className="mt-3 pt-3 border-t border-neutral-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-neutral-600 hover:text-neutral-800"
          >
            Бүх шүүлтүүрийг арилгах
          </Button>
        </div>
      )}
    </div>
  );
}
