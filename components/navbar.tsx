"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`
          w-full max-w-7xl flex items-center justify-between
          px-6 py-3 border border-white/10 backdrop-blur bg-[#050505]/70
          rounded-full transition-all duration-300
          ${scrolled ? "shadow-lg" : ""}
        `}
      >
        {/* Logo */}
        <Link href="/" className="relative z-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-red-500 tracking-tight"
          >
            OmniVision
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Why Us", "Portfolio", "Testimonials", "FAQs"].map(label => (
            <NavLink key={label} href={`#${label.toLowerCase().replace(/\s+/g, "")}`}>
              {label}
            </NavLink>
          ))}
          <AnimatedButton href="#contact" variant="default" size="default">
            Let’s Talk
          </AnimatedButton>
        </div>

        {/* Mobile Toggle */}
        <button
        ref={toggleRef}
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden text-red-500 z-20"
  aria-label="Toggle menu"
>
  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>

        {/* Mobile Modal */}
        <AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
    ref={menuRef}
      key="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "280px", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "tween", duration: 0.4 }}
      className="
        absolute top-full left-0 right-0
        bg-[#111]/90 backdrop-blur-sm
        overflow-hidden mx-4 mt-2 rounded-2xl
        border border-white/10
      "
    >
      <div className="flex flex-col items-center space-y-4 py-6">
        {["Why Us", "Portfolio", "Testimonials", "FAQs"].map(label => (
          <Link
            key={label}
            href={`#${label.toLowerCase().replace(/\s+/g, "")}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-white text-lg transition"
          >
            {label}
          </Link>
        ))}
        <AnimatedButton
          href="#contact"
          variant="default"
          size="default"
          className="mt-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          Let’s Talk
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
    <Link
      href={href}
      className="relative text-gray-300 hover:text-white transition group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all" />
    </Link>
  )
}
