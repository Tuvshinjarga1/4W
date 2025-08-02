import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import UrgencyIndicator from "./UrgencyIndicator"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 text-neutral-800 text-xs">
              {product.category}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-1">{product.title}</h3>

          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{product.description}</p>

          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-1 text-xs text-neutral-600">
              <MapPin className="w-3 h-3 text-green-600" />
              <span>{product.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-600">
              <Calendar className="w-3 h-3 text-green-600" />
              <span>Expires: {new Date(product.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs">🧑‍💼</span>
              </div>
              <span className="text-xs text-neutral-600">{product.seller?.name ?? "Unknown Seller"}</span>
            </div>
            <span className="text-sm font-medium text-neutral-800">Qty: {product.quantity}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
