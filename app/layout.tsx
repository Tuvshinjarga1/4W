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
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`${inter.className} bg-neutral-50 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
