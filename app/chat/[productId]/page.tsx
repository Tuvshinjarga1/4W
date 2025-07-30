import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/ChatInterface";
import { getProductById } from "@/lib/data";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface ChatPageProps {
  params: {
    productId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const product = await getProductById(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <Link href={`/product/${params.productId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="font-semibold text-neutral-800">
                {product.title}
              </h1>
              <p className="text-sm text-neutral-600">
                Chat with {product.seller.name}
              </p>
            </div>
          </div>
        </header>

        <ChatInterface productId={params.productId} />
      </div>
    </ProtectedRoute>
  );
}
