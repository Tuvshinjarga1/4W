export interface Seller {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  quantity: string;
  category: string;
  expiryDate: Date;
  seller: Seller;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ChatMessage {
  id?: string;
  productId: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface ProductWithChat extends Product {
  chat?: ChatMessage | null;
}
