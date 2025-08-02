"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getChatMessages,
  createChatMessage,
  updateChatMessage,
  deleteChatMessage,
} from "@/lib/data";
import { auth } from "@/lib/firebase";

import type { ChatMessage } from "@/lib/data";

interface ChatInterfaceProps {
  productId: string;
}

export default function ChatInterface({ productId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;
  const currentUserId = user ? user.uid : "unknown";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const msgs = await getChatMessages(productId);
      setMessages(msgs);
      setLoading(false);
      scrollToBottom();
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [productId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const user = auth.currentUser;
    const senderId = user ? user.uid : "unknown";
    await createChatMessage({
      productId,
      senderId,
      text: newMessage,
      timestamp: new Date(),
    });
    setNewMessage("");
    const msgs = await getChatMessages(productId);
    setMessages(msgs);
  };

  const handleEditMessage = async (id: string) => {
    if (!editingText.trim()) return;
    await updateChatMessage(id, editingText);
    setEditingId(null);
    setEditingText("");
    const msgs = await getChatMessages(productId);
    setMessages(msgs);
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteChatMessage(id);
    const msgs = await getChatMessages(productId);
    setMessages(msgs);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div>Чат ачааллаж байна...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-neutral-500">
            Одоогоор мессеж байхгүй байна.
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.senderId === currentUserId;
            return (
              <div
                key={message.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {!isMe && (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🧑‍💼</span>
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      isMe
                        ? "bg-green-600 text-white"
                        : "bg-white border border-neutral-200 text-neutral-800"
                    }`}
                  >
                    {editingId === message.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEditMessage(message.id!);
                        }}
                        className="flex gap-2"
                      >
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="sm">
                          Хадгалах
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Цуцлах
                        </Button>
                      </form>
                    ) : (
                      <>
                        <p className="text-sm">{message.text}</p>
                        <div className="flex gap-1 mt-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(message.id!);
                              setEditingText(message.text);
                            }}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteMessage(message.id!)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  {isMe && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-neutral-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Мессежээ бичнэ үү..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
