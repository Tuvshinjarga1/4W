"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plus,
  MessageSquare,
  Home,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ХХ</span>
              </div>
              <span className="font-bold text-neutral-800">ХүнсХуваалцах</span>
            </Link>

            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <Link href="/">
                  <Button
                    variant={pathname === "/" ? "default" : "ghost"}
                    size="sm"
                    className={
                      pathname === "/" ? "bg-green-600 hover:bg-green-700" : ""
                    }
                  >
                    <Home className="w-4 h-4" />
                  </Button>
                </Link>
                {currentUser && (
                  <>
                    <Link href="/add-product">
                      <Button
                        variant={
                          pathname === "/add-product" ? "default" : "ghost"
                        }
                        size="sm"
                        className={
                          pathname === "/add-product"
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </Link>
                  </>
                )}
              </nav>

              {/* Authentication Section */}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentUser.photoURL || undefined}
                          alt={currentUser.displayName || ""}
                        />
                        <AvatarFallback className="bg-green-600 text-white">
                          {currentUser.displayName ? (
                            getUserInitials(currentUser.displayName)
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {currentUser.displayName || "Хэрэглэгч"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Тохиргоо</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Гарах</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAuthClick}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Нэвтрэх / Бүртгүүлэх
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
