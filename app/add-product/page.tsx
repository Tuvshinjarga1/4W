import Header from "@/components/Header";
import AddProductForm from "@/components/AddProductForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AddProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
          <div className="w-full">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
                Шинэ бүтээгдэхүүн нэмэх
              </h1>
              <p className="text-neutral-600 text-sm">
                Илүүдэл хүнсээ олон нийттэй хуваалцаарай
              </p>
            </div>

            <AddProductForm />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
