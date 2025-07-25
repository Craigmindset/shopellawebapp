"use client"
"use client"
import type { ReactNode } from "react"
import ScrollPopupNotification from "./scroll-popup-notification"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        <div className="space-y-4 sm:space-y-6">{children}</div>
      </div>

      {/* Scroll Popup Notification */}
      <ScrollPopupNotification
        title="🎉 Shopella Deal Offers"
        description="Get exclusive deals and over 20% on Shopella."
        image="/placeholder.svg?height=80&width=80&text=App+Download"
        ctaText="Get Now"
        ctaUrl="https://shopella.ng"
        scrollThreshold={400}
      />
    </div>
  )
}
