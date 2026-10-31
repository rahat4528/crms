import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
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

export const metadata: Metadata = {
  title: {
    default: "Modo — Premium Fashion & Lifestyle",
    template: "%s | Modo",
  },
  description:
    "Discover curated collections of premium fashion and lifestyle products that define modern elegance.",
  keywords: ["fashion", "lifestyle", "premium", "luxury", "clothing", "accessories"],
  authors: [{ name: "Modo" }],
  creator: "Modo",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Modo",
    title: "Modo — Premium Fashion & Lifestyle",
    description:
      "Discover curated collections of premium fashion and lifestyle products.",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolageGrotesque.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={null}>{children}</Suspense>
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
