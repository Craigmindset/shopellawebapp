import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-96">
      {/* Main Hero Banner */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 lg:flex-[0.7] min-h-[250px] lg:min-h-0">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col sm:flex-row h-full">
            <div className="flex-1 p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">Boost Now,</h1>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-5">Profit More!</h1>
              <p className="text-blue-100 mb-6 lg:mb-8 text-base lg:text-lg">
                Get noticed by more
                <br />
                buyers and sell faster!
              </p>
              <div className="text-6xl sm:text-7xl lg:text-9xl font-bold opacity-20">2</div>
            </div>
            <div className="flex-1 relative min-h-[200px] sm:min-h-0">
              <Image
                src="/placeholder.svg?height=384&width=384"
                alt="Smiling woman with colorful clothing"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Trust Banner */}
      <Card className="bg-gradient-to-br from-slate-700 to-slate-900 text-white lg:flex-[0.3] min-h-[200px] lg:min-h-0">
        <CardContent className="p-6 lg:p-8 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3">No Risks, Just</h2>
            <h2 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3">Trust - Use</h2>
            <h2 className="text-lg lg:text-xl font-bold text-blue-400">Shopella escrow</h2>
          </div>
          <div className="flex justify-end">
            <div className="relative">
              <ShoppingBag className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-400" />
              <ShoppingBag className="w-8 h-8 lg:w-12 lg:h-12 text-blue-400 absolute -bottom-2 lg:-bottom-3 -right-2 lg:-right-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
