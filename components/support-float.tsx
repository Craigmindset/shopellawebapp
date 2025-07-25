"use client"

import { useState } from "react"
import { MessageCircle, Phone, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      {/* Floating Button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full bg-gradient-to-br from-green-500 to-blue-600 shadow-lg hover:scale-105 transition-transform duration-200 p-0 w-14 h-14 flex items-center justify-center"
          style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" }}
          aria-label="Open support options"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </Button>
      )}
      {/* Support Options */}
      {open && (
        <div className="flex flex-col items-end gap-2 animate-in fade-in duration-200">
          <Button
            onClick={() => window.open('https://wa.me/2348000000000', '_blank')}
            className="rounded-full bg-green-500 hover:bg-green-600 shadow-md p-0 w-12 h-12 flex items-center justify-center"
            aria-label="WhatsApp support"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18c-1.61 0-3.13-.39-4.45-1.13l-.32-.18-3.02.79.8-2.95-.2-.33A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8Zm4.13-5.47c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.41-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.29-.01-.45-.01-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.93 0 1.14.83 2.25.95 2.41.12.15 1.63 2.5 3.95 3.41.55.19.98.3 1.31.38.55.14 1.05.12 1.45.07.44-.07 1.36-.56 1.55-1.1.19-.54.19-1.01.13-1.1-.06-.09-.21-.15-.44-.27Z"/></svg>
          </Button>
          <Button
            onClick={() => window.open('tel:+2348000000000', '_blank')}
            className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-md p-0 w-12 h-12 flex items-center justify-center"
            aria-label="Call support"
          >
            <Phone className="w-6 h-6 text-white" />
          </Button>
          <Button
            onClick={() => window.open('mailto:support@shopella.com', '_blank')}
            className="rounded-full bg-gray-500 hover:bg-gray-600 shadow-md p-0 w-12 h-12 flex items-center justify-center"
            aria-label="Email support"
          >
            <Mail className="w-6 h-6 text-white" />
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="rounded-full bg-gray-200 hover:bg-gray-300 shadow p-0 w-10 h-10 flex items-center justify-center"
            aria-label="Close support options"
          >
            <X className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      )}
    </div>
  )
}
