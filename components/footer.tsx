import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Stacked */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {/* Company Info - Full width on mobile */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-blue-400">Shopella</span>
            </div>
            <p className="text-gray-300 text-sm mb-3 max-w-md">
              Nigeria's leading marketplace for buying and selling products and services safely and securely.
            </p>
            <div className="flex gap-3">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Other sections - Three columns on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Popular Categories</h3>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Real Estate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Vehicles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Jobs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-3">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">support@shopella.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+234 800 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Centered Single Row */}
        <div className="hidden md:flex md:justify-center">
          <div className="grid grid-cols-4 gap-12 lg:gap-16 xl:gap-20 max-w-5xl w-full">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-xl text-blue-400">Shopella</span>
              </div>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                Nigeria's leading marketplace for buying and selling products and services safely and securely.
              </p>
              <div className="flex gap-3 justify-center md:justify-start">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-3">Popular Categories</h3>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Real Estate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Vehicles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Jobs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-3">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>support@shopella.com</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+234 800 123 4567</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 Shopella. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
