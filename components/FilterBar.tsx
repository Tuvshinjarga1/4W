"use client";

import { useState } from "react";
import { Filter, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-neutral-600" />
        <span className="text-sm font-medium text-neutral-700">Шүүлтүүр</span>
      </div>

      <div className="space-y-3">
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

      {activeFilters.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters([])}
            className="text-xs text-neutral-600 hover:text-neutral-800"
          >
            Бүх шүүлтүүрийг арилгах
          </Button>
        </div>
      )}
    </div>
  );
}
