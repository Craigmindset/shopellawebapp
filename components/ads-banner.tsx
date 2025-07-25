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

      {/* Blue Banner */}
      <Card className="bg-blue-900 min-h-[120px] sm:min-h-[150px] lg:min-h-[192px]" />

      {/* Ad Banner */}
      <Card className="bg-green-900 min-h-[120px] sm:min-h-[150px] lg:min-h-[192px] sm:col-span-2 lg:col-span-1 flex items-center justify-center">
        <CardContent className="flex items-center justify-center h-full w-full">
          <span className="text-white text-lg font-bold">ad banner</span>
        </CardContent>
      </Card>
    </div>
  )
}
