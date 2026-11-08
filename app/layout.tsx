import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa da Inovação E. F. Therezópolis",
  description: "Tecnologia, cultura e oportunidades gratuitas em Teresópolis.",
  openGraph: {
    title: "Casa da Inovação E. F. Therezópolis",
    description: "Cursos gratuitos de tecnologia, cultura e inclusão digital em Teresópolis.",
    images: ["/imagens/fachada.webp"],
  },
  icons: {
    icon: "/imagens/favicon.png",
    shortcut: "/imagens/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/style.css?v=20261108-responsive-layout" />
        <link rel="stylesheet" href="/css/dia-noite.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
