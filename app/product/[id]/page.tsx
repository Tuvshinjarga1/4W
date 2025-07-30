import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Package, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductById } from "@/lib/data"
import UrgencyIndicator from "@/components/UrgencyIndicator"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-semibold text-neutral-800">Product Details</h1>
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
              <UrgencyIndicator expiryDate={product.expiryDate} />
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-neutral-800 mb-2">{product.title}</h1>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {product.category}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">Quantity</p>
                <p className="font-semibold text-neutral-800">{product.quantity}</p>
              </div>
            </div>

            <p className="text-neutral-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>Expires: {new Date(product.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Package className="w-4 h-4 text-green-600" />
                <span>Available: {product.quantity}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🧑‍💼</span>
                </div>
                <div>
                  <p className="font-medium text-neutral-800">{product.seller.name}</p>
                  <p className="text-sm text-neutral-600">Seller</p>
                </div>
              </div>

              <Link href={`/chat/${product.id}`}>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
