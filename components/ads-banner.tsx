import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AdsBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 h-auto">
      {/* Gadgets */}
      <Card className="bg-gradient-to-br from-blue-600 to-green-400 min-h-[120px] sm:min-h-[150px] lg:min-h-[192px]">
        <CardContent className="p-4 sm:p-6 lg:p-8 h-full flex items-end">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gadgets</h2>
        </CardContent>
      </Card>

      {/* Download App */}
      <Card className="bg-white min-h-[120px] sm:min-h-[150px] lg:min-h-[192px]">
        <CardContent className="p-4 sm:p-6 h-full flex items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Download</h3>
            <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-base sm:text-lg">Shopella App</h3>
            <div className="flex gap-2">
              <div className="bg-black rounded px-2 sm:px-3 py-1 sm:py-2 text-xs text-white">App Store</div>
              <div className="bg-black rounded px-2 sm:px-3 py-1 sm:py-2 text-xs text-white">Google Play</div>
            </div>
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Phone showing Shopella app"
              fill
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>

      {/* Negotiate Banner */}
      <Card className="bg-gradient-to-r from-green-300 to-green-400 min-h-[120px] sm:min-h-[150px] lg:min-h-[192px] sm:col-span-2 lg:col-span-1">
        <CardContent className="p-4 sm:p-6 h-full flex items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">
              Why settle for the listed price?
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-800">
              Make offers, negotiate, and shop smart on Shopella!
            </p>
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Woman pointing"
              fill
              className="object-cover rounded"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
