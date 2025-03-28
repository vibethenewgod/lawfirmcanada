"use client"
import { useState, useEffect } from "react"
import { User, Search, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : ""}`}
    >
      {/* Gradient overlay for non-scrolled state */}
      {!scrolled && (
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>
      )}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center h-20">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Tomi Law Logo" width={40} height={40} className="mr-3" />
          <Link
            href="/"
            className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${scrolled ? "text-[#012b51]" : "text-white"}`}
          >
            Tomi Law Office
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {["About", "People", "Expertise", "Insights", "Contact Us"].map((item) => (
            <Link
              key={item}
              href="#"
              className={`text-base font-medium tracking-wide transition-colors duration-300 py-8 ${scrolled ? "text-gray-800 hover:text-[#012b51]" : "text-white hover:opacity-80"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button
            className={`hidden md:block transition-colors duration-300 ${scrolled ? "text-gray-800 hover:text-[#012b51]" : "text-white hover:opacity-80"}`}
          >
            <Search size={18} />
          </button>
          <button
            className={`hidden md:block transition-colors duration-300 ${scrolled ? "text-gray-800 hover:text-[#012b51]" : "text-white hover:opacity-80"}`}
          >
            <User size={18} />
          </button>
          <button
            className={`lg:hidden transition-colors duration-300 ${scrolled ? "text-gray-800" : "text-white"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Blakes.com style */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
        style={{ top: "80px" }}
      >
        <div className="container mx-auto px-6 py-8">
          <nav className="flex flex-col space-y-6">
            {["About", "People", "Expertise", "Insights", "Contact Us"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xl font-medium text-[#012b51] border-b border-gray-200 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex space-x-6">
            <button className="p-2 text-[#012b51]">
              <Search size={20} />
            </button>
            <button className="p-2 text-[#012b51]">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

