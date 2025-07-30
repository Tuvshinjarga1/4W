"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, MessageSquare, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <span className="font-bold text-neutral-800">FoodShare</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
                className={pathname === "/" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/add-product">
              <Button
                variant={pathname === "/add-product" ? "default" : "ghost"}
                size="sm"
                className={pathname === "/add-product" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/inbox">
              <Button
                variant={pathname === "/inbox" ? "default" : "ghost"}
                size="sm"
                className={pathname === "/inbox" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
