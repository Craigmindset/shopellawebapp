"use client"


import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HeroSection() {

  // Carousel data
  const slides = [
    {
      title1: "Boost Now,",
      title2: "Profit More!",
      description: "Get noticed by more\nbuyers and sell faster!",
      image: "/slide1.jpg",
      bg: "bg-gradient-to-r from-blue-600 to-blue-800",
      number: "2",
    },
    {
      title1: "Sell Smarter,",
      title2: "Grow Faster!",
      description: "Unlock premium features\nand reach more customers!",
      image: "/slide2.jpg",
      bg: "bg-gradient-to-r from-green-600 to-green-800",
      number: "5",
    },
    {
      title1: "Join Shopella,",
      title2: "Shop Happy!",
      description: "Discover amazing deals\nand enjoy secure shopping!",
      image: "/slide3.jpg",
      bg: "bg-gradient-to-r from-purple-600 to-purple-800",
      number: "9",
    },
  ]


  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  const handleNext = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 4000) // 4 seconds per slide
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-96">
      {/* Main Hero Banner - Carousel */}
      <Card className={`relative overflow-hidden ${slide.bg} lg:flex-[0.7] min-h-[250px] lg:min-h-0`}>
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-[250px] lg:h-full">
            <Image
              src={slide.image}
              alt="Hero Slide"
              fill
              className="object-cover"
              priority
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === current ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promo Video Banner */}
      <Card className="relative overflow-hidden bg-black lg:flex-[0.3] min-h-[200px] lg:min-h-0 flex items-center justify-center">
        <CardContent className="p-0 h-full w-full flex flex-col items-center justify-end relative">
          <video
            src="/advideo.mp4"
            className="w-full h-full object-cover absolute top-0 left-0 z-0"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            poster="/placeholder.jpg"
          />
          <div className="relative z-10 w-full flex flex-col items-center justify-end h-full pb-8">
            <h2 className="text-white text-lg lg:text-xl font-bold mb-4 drop-shadow-lg">Iphone 16 promax</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded shadow-lg">
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
