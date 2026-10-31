import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Suspense } from "react"
import { AppearanceProvider } from "@/components/appearance-provider"
import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Modo — Considered Fashion & Living",
    template: "%s — Modo",
  },
  description:
    "Modo presents considered fashion and living essentials crafted with purpose, tactile materials, and enduring design.",
  keywords: ["considered fashion", "living", "slow fashion", "curated", "modo"],
  authors: [{ name: "Modo" }],
  creator: "Modo",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Modo",
    title: "Modo — Considered Fashion & Living",
    description:
      "Considered fashion and living essentials crafted with purpose and enduring design.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolageGrotesque.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground flex flex-col">
        <AppearanceProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster richColors position="top-right" />
        </AppearanceProvider>
        <Analytics />
      </body>
    </html>
  )
}
