import type { Product, ProductWithChat } from "./types";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { auth } from "./firebase";

// Add product to Firebase
export async function addProduct(productData: any): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Хэрэглэгч нэвтрээгүй байна");
  }

  // Log coordinates for debugging
  console.log("addProduct - Received productData:", productData);
  console.log("addProduct - Coordinates:", productData.coordinates);

  const productWithSeller = {
    ...productData,
    seller: {
      id: user.uid,
      name: user.displayName || user.email || "Unknown Seller",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log("addProduct - Final data to save:", productWithSeller);

  const docRef = await addDoc(collection(db, "products"), productWithSeller);
  console.log("addProduct - Document saved with ID:", docRef.id);
  return docRef.id;
}

export async function getProducts(): Promise<ProductWithChat[]> {
  const productsSnapshot = await getDocs(collection(db, "products"));
  const products: ProductWithChat[] = [];

  for (const docSnap of productsSnapshot.docs) {
    const data = docSnap.data();

    // Log raw data for debugging
    console.log("getProducts - Raw data for product:", docSnap.id, data);
    console.log("getProducts - Raw coordinates:", data.coordinates);

    const product: Product = {
      id: docSnap.id,
      title: data.title?.replace(/^"|"$/g, "").trim() ?? "",
      description: data.description ?? "",
      image: data.image ?? "/placeholder.svg",
      location: data.location ?? "",
      quantity:
        typeof data.quantity === "string"
          ? data.quantity
          : String(data.quantity ?? ""),
      category: data.category ?? "Uncategorized",
      expiryDate: data.expiryDate?.toDate?.() || new Date(),
      seller: data["seller "] ??
        data.seller ?? { id: "", name: "Unknown Seller" },
      coordinates: data.coordinates || null,
    };

    console.log("getProducts - Processed product:", product);
    console.log("getProducts - Processed coordinates:", product.coordinates);

    const chatQuery = query(
      collection(db, "chats"),
      where("productId", "==", docSnap.id)
    );
    const chatSnapshot = await getDocs(chatQuery);
    let chat = null;
    if (!chatSnapshot.empty) {
      const chatData = chatSnapshot.docs[0].data();
      chat = {
        id: chatSnapshot.docs[0].id,
        productId: chatData.productId,
        senderId: chatData.senderId,
        text: chatData.text,
        timestamp: chatData.timestamp?.toDate?.() || new Date(),
      };
    }

    products.push({ ...product, chat });
  }

  return products;
}

export async function getProductById(
  id: string
): Promise<ProductWithChat | null> {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);
  if (!productSnap.exists()) return null;

  const data = productSnap.data();
  const product: Product = {
    id: productSnap.id,
    title: data.title?.replace(/^"|"$/g, "").trim() ?? "",
    description: data.description ?? "",
    image: data.image ?? "/placeholder.svg",
    location: data.location ?? "",
    quantity:
      typeof data.quantity === "string"
        ? data.quantity
        : String(data.quantity ?? ""),
    category: data.category ?? "Uncategorized",
    expiryDate: data.expiryDate?.toDate?.() || new Date(),
    seller: data["seller "] ??
      data.seller ?? { id: "", name: "Unknown Seller" },
    coordinates: data.coordinates || null,
  };

  const chatQuery = query(
    collection(db, "chats"),
    where("productId", "==", id)
  );
  const chatSnapshot = await getDocs(chatQuery);
  let chat = null;
  if (!chatSnapshot.empty) {
    const chatData = chatSnapshot.docs[0].data();
    chat = {
      id: chatSnapshot.docs[0].id,
      productId: chatData.productId,
      senderId: chatData.senderId,
      text: chatData.text,
      timestamp: chatData.timestamp?.toDate?.() || new Date(),
    };
  }

  return { ...product, chat };
}

export interface ChatMessage {
  id?: string;
  productId: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

// CREATE
export async function createChatMessage(message: ChatMessage): Promise<string> {
  const docRef = await addDoc(collection(db, "chats"), {
    productId: message.productId,
    senderId: message.senderId,
    text: message.text,
    timestamp: message.timestamp,
  });
  return docRef.id;
}

// READ
export async function getChatMessages(
  productId: string
): Promise<ChatMessage[]> {
  const chatQuery = query(
    collection(db, "chats"),
    where("productId", "==", productId),
    orderBy("timestamp", "asc")
  );
  const chatSnapshot = await getDocs(chatQuery);

  return chatSnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      productId: data.productId,
      senderId: data.senderId,
      text: data.text,
      timestamp: data.timestamp?.toDate?.() || new Date(),
    };
  });
}

// UPDATE
export async function updateChatMessage(
  id: string,
  text: string
): Promise<void> {
  const chatRef = doc(db, "chats", id);
  await updateDoc(chatRef, { text });
}

// DELETE
export async function deleteChatMessage(id: string): Promise<void> {
  const chatRef = doc(db, "chats", id);
  await deleteDoc(chatRef);
}

interface ChatThread {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  buyerName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export async function getChatThreads(
  currentUserId: string
): Promise<ChatThread[]> {
  const q = query(
    collection(db, "chats"),
    where("senderId", "==", currentUserId),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);

  const threadsMap: Record<string, ChatThread> = {};

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const productId = data.productId;

    if (!threadsMap[productId]) {
      const productRef = collection(db, "products");
      const productDocs = await getDocs(
        query(productRef, where("id", "==", productId))
      );
      const productData = productDocs.docs[0]?.data();

      threadsMap[productId] = {
        id: docSnap.id,
        productId,
        productTitle: productData?.title ?? "Untitled",
        productImage: productData?.image ?? "/placeholder.svg",
        buyerName: "you",
        lastMessage: data.text,
        lastMessageTime: data.timestamp?.toDate?.() || new Date(),
        unreadCount: 0,
      };
    }
  }

  return Object.values(threadsMap);
}

export async function getInboxChatsForSeller(sellerId: string) {
  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where("sellerId", "==", sellerId),
    orderBy("timestamp", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      productId: data.productId,
      productTitle: data.productTitle,
      productImage: data.productImage,
      buyerName: data.buyerName,
      lastMessage: data.text,
      lastMessageTime: data.timestamp?.toDate?.() ?? new Date(),
      unreadCount: data.unreadCount ?? 0,
    };
  });
}
