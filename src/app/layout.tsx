import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paragraph Splitter - Tamil Text Processing Tool",
  description: "Advanced Tamil text processing tool that intelligently splits Bible verses, page numbers, and English words. Perfect for Tamil Bible study and text analysis.",
  keywords: ["Tamil text processing", "Paragraph splitter", "Bible verse splitter", "Tamil Bible", "Text analysis", "Tamil language tools"],
  authors: [{ name: "Paragraph Splitter Team" }],
  openGraph: {
    title: "Paragraph Splitter - Tamil Text Processing Tool",
    description: "Advanced Tamil text processing tool that intelligently splits Bible verses, page numbers, and English words.",
    url: "https://chat.z.ai",
    siteName: "Paragraph Splitter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paragraph Splitter - Tamil Text Processing Tool",
    description: "Advanced Tamil text processing tool that intelligently splits Bible verses, page numbers, and English words.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
