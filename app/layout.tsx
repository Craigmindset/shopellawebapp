import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Lato } from "next/font/google"
import "./globals.css"
import { CartProvider } from "../contexts/cart-context"

// Import Lato font
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "shopella",
  description: "online shopping platform",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lato.variable}>
      <head>
        <style>{`
html {
  font-family: ${lato.style.fontFamily}, ${GeistSans.style.fontFamily};
  --font-sans: ${lato.variable}, ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
