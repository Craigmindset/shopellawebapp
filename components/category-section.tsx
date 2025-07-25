"use client"

import { Smartphone, Monitor, Zap, Headphones, Home, Heart, Watch, Star } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Phones and Tablets",
    icon: <Smartphone className="w-8 h-8 text-blue-600" />,
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Computing",
    icon: <Monitor className="w-8 h-8 text-purple-600" />,
    color: "bg-purple-50",
  },
  {
    id: 3,
    name: "Electronics",
    icon: <Zap className="w-8 h-8 text-yellow-600" />,
    color: "bg-yellow-50",
  },
  {
    id: 4,
    name: "Accessories",
    icon: <Headphones className="w-8 h-8 text-green-600" />,
    color: "bg-green-50",
  },
  {
    id: 5,
    name: "Home & Kitchen",
    icon: <Home className="w-8 h-8 text-red-600" />,
    color: "bg-red-50",
  },
  {
    id: 6,
    name: "Lifestyle",
    icon: <Heart className="w-8 h-8 text-pink-600" />,
    color: "bg-pink-50",
  },
  {
    id: 7,
    name: "Watches",
    icon: <Watch className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50",
  },
  {
    id: 8,
    name: "Premium Devices",
    icon: <Star className="w-8 h-8 text-orange-600" />,
    color: "bg-orange-50",
  },
]

export default function CategorySection() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">What are you shopping for today?</h2>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-6">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center cursor-pointer group">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${category.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:shadow-lg transition-all duration-300 border border-gray-100`}
                style={{
                  boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px -8px rgba(59, 130, 246, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 0 rgba(59, 130, 246, 0)"
                }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-current">{category.icon}</div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
