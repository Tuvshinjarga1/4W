import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ХүнсХуваалцах - Хамтдаа хүнсний хог хаягдлыг бууруулах",
  description:
    "НҮБ-ын тогтвортой хөгжлийн зорилгод нийцүүлэн хүнс хуваалцах, хог хаягдлыг бууруулах олон нийтийн платформ",
  keywords:
    "хүнс хуваалцах, тогтвортой байдал, хог хаягдал бууруулах, олон нийт, НҮБ-ын ТХЗ",
  generator: "4W",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className={`${inter.className} bg-neutral-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
