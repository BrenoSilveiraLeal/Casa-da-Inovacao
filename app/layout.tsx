import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionSystem } from "./motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casa da Inovação E. F. Therezópolis",
  description: "Tecnologia, cultura e oportunidades gratuitas em Teresópolis.",
  icons: {
    icon: "/imagens/logo-casa.webp",
    shortcut: "/imagens/logo-casa.webp",
    apple: "/imagens/logo-casa.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <MotionSystem />
      </body>
    </html>
  );
}
