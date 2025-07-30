import type { Product } from "./types"

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Fresh Organic Apples",
    description: "Crisp and sweet organic apples from my garden. Perfect for snacking or baking. No pesticides used.",
    category: "Fruits",
    quantity: "3 kg",
    expiryDate: "2024-02-05",
    location: "Downtown, Main Street",
    image: "/placeholder.svg?height=300&width=400",
    seller: {
      id: "1",
      name: "John Smith",
    },
  },
  {
    id: "2",
    title: "Homemade Sourdough Bread",
    description: "Freshly baked sourdough bread made with organic flour. Crusty outside, soft inside.",
    category: "Bakery",
    quantity: "2 loaves",
    expiryDate: "2024-02-03",
    location: "Riverside District",
    image: "/placeholder.svg?height=300&width=400",
    seller: {
      id: "2",
      name: "Maria Garcia",
    },
  },
  {
    id: "3",
    title: "Garden Fresh Tomatoes",
    description: "Vine-ripened tomatoes from my backyard garden. Great for salads, cooking, or making sauce.",
    category: "Vegetables",
    quantity: "2 kg",
    expiryDate: "2024-02-07",
    location: "Suburban Area, Oak Street",
    image: "/placeholder.svg?height=300&width=400",
    seller: {
      id: "3",
      name: "David Wilson",
    },
  },
  {
    id: "4",
    title: "Artisan Cheese Selection",
    description: "Variety of artisan cheeses including cheddar, gouda, and brie. Perfect for cheese boards.",
    category: "Dairy",
    quantity: "500g each",
    expiryDate: "2024-02-10",
    location: "City Center",
    image: "/placeholder.svg?height=300&width=400",
    seller: {
      id: "4",
      name: "Sophie Brown",
    },
  },
  {
    id: "5",
    title: "Fresh Herbs Bundle",
    description: "Mixed fresh herbs including basil, parsley, cilantro, and mint. Great for cooking.",
    category: "Vegetables",
    quantity: "1 bundle",
    expiryDate: "2024-02-04",
    location: "Garden District",
    image: "/placeholder.svg?height=300&width=400",
    seller: {
      id: "5",
      name: "Alex Johnson",
    },
  },
  {
    id: "6",
    title: "Homemade Pasta",
    description: "Fresh handmade pasta including fettuccine and ravioli. Made with organic eggs and flour.",
    category: "Other",
    quantity: "1 kg",
    expiryDate: "2024-02-06",
    location: "Little Italy",
    image: "/placeholder.svg?height=300&width=400",
    seller: {
      id: "6",
      name: "Giuseppe Romano",
    },
  },
]

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.find((product) => product.id === id) || null
}
