import Header from "@/components/Header"
import AddProductForm from "@/components/AddProductForm"

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">Add New Product</h1>
            <p className="text-neutral-600 text-sm">Share your surplus food with the community</p>
          </div>

          <AddProductForm />
        </div>
      </main>
    </div>
  )
}
