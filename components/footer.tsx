"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { AdvancedButton } from "@/components/ui/advanced-button"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <footer ref={ref} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-red-600">
              OmniVision
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-8 md:mb-0"
          >
            <Link href="#why-me" className="text-gray-400 hover:text-white transition-colors">
              Why Me
            </Link>
            <Link href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="#feedback" className="text-gray-400 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#faqs" className="text-gray-400 hover:text-white transition-colors">
              FAQs
            </Link>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <AdvancedButton variant="default" size="default" radius="full" href="#contact" showArrow>
              Let&apos;s Talk
            </AdvancedButton>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} OmniVision. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
