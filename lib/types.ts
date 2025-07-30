export interface Product {
  id: string
  title: string
  description: string
  category: string
  quantity: string
  expiryDate: string
  location: string
  image: string
  seller: {
    id: string
    name: string
  }
}

export interface User {
  id: string
  name: string
  role: "buyer" | "seller"
}

export interface ChatMessage {
  id: string
  productId: string
  senderId: string
  text: string
  timestamp: Date
}
