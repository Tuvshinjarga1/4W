"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ChatThread {
  id: string
  productId: string
  productTitle: string
  productImage: string
  buyerName: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export default function InboxList() {
  const chatThreads: ChatThread[] = [
    {
      id: "1",
      productId: "1",
      productTitle: "Fresh Organic Apples",
      productImage: "/placeholder.svg?height=60&width=60",
      buyerName: "Sarah Johnson",
      lastMessage: "Great! Would this evening around 6 PM work for you?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 20),
      unreadCount: 1,
    },
    {
      id: "2",
      productId: "2",
      productTitle: "Homemade Sourdough Bread",
      productImage: "/placeholder.svg?height=60&width=60",
      buyerName: "Mike Chen",
      lastMessage: "Is the bread still available for pickup tomorrow?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
    },
    {
      id: "3",
      productId: "3",
      productTitle: "Garden Fresh Tomatoes",
      productImage: "/placeholder.svg?height=60&width=60",
      buyerName: "Emma Wilson",
      lastMessage: "Thank you so much! The tomatoes were delicious.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
    },
  ]

  if (chatThreads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-lg font-medium text-neutral-800 mb-2">No conversations yet</h3>
        <p className="text-neutral-600 text-sm">When buyers message you about your products, they'll appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {chatThreads.map((thread) => (
        <Link key={thread.id} href={`/chat/${thread.productId}`}>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <Image
                src={thread.productImage || "/placeholder.svg"}
                alt={thread.productTitle}
                width={60}
                height={60}
                className="w-15 h-15 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-neutral-800 truncate">{thread.productTitle}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {thread.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {thread.unreadCount}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {thread.lastMessageTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <span className="text-sm text-neutral-600">{thread.buyerName}</span>
                </div>

                <p className="text-sm text-neutral-600 truncate">{thread.lastMessage}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
