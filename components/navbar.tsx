"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 ">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-between w-full max-w-7xl rounded-full px-4 md:px-8 py-2 border-2 border-white/10 transition-all duration-300  ${
          scrolled ? "bg-[#050505] backdrop-blur" : "bg-[#050505] backdrop-blur"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-blue-600"
          >
            OmniVision
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:flex items-center space-x-8"
        >
          <NavLink href="#why-me">Why Me</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#feedback">Testimonials</NavLink>
          <NavLink href="#faqs">FAQs</NavLink>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden md:block"
        >
          <AnimatedButton variant="default" size="default" href="#contact">
            Let&apos;s Talk
          </AnimatedButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:hidden relative z-20 text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-10 md:hidden"
            >
              <div className="flex flex-col items-center space-y-8">
                <MobileNavLink href="#why-me" onClick={() => setMobileMenuOpen(false)}>
                  Why Me
                </MobileNavLink>
                <MobileNavLink href="#portfolio" onClick={() => setMobileMenuOpen(false)}>
                  Portfolio
                </MobileNavLink>
                <MobileNavLink href="#feedback" onClick={() => setMobileMenuOpen(false)}>
                  Testimonials
                </MobileNavLink>
                <MobileNavLink href="#faqs" onClick={() => setMobileMenuOpen(false)}>
                  FAQs
                </MobileNavLink>
                <AnimatedButton
                  variant="default"
                  size="default"
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let&apos;s Talk
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors duration-200 relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-white transition-colors duration-200 text-xl relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}
