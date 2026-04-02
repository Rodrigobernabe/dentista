import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clínica Dental Villa Mercedes | Odontología Premium en San Luis",
  description: "Experiencia dental de lujo en Villa Mercedes, San Luis. Especialistas en implantes, ortodoncia y estética dental. Tecnología de vanguardia y atención personalizada.",
  keywords: ["clínica dental", "Villa Mercedes", "San Luis", "implantes dentales", "ortodoncia", "estética dental", "odontología premium", "blanqueamiento dental"],
  authors: [{ name: "Clínica Dental Villa Mercedes" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Clínica Dental Villa Mercedes | Odontología Premium",
    description: "Experiencia dental de lujo en Villa Mercedes, San Luis. Tecnología de vanguardia y atención personalizada.",
    url: "https://clinicavillamercedes.com",
    siteName: "Clínica Dental Villa Mercedes",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Dental Villa Mercedes",
    description: "Experiencia dental de lujo en Villa Mercedes, San Luis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
