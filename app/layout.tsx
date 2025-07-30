import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FoodShare - Reduce Food Waste Together",
  description:
    "A community platform for sharing food and reducing waste, promoting sustainable consumption aligned with UN SDGs",
  keywords: "food sharing, sustainability, reduce waste, community, UN SDGs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50`}>{children}</body>
    </html>
  )
}
