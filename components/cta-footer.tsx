"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AnimatedButton } from "./ui/animated-button"

export default function CTAFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <footer className="relative py-20 md:py-24 overflow-hidden bg-black">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          {/* Brand name */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-blue-600 font-medium">OmniVision</span>
          </motion.div>

          {/* Main heading */}
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            Let&apos;s Turn Your
          </motion.h2>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            Dream Video
          </motion.h2>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Into Reality
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-gray-400 max-w-md mb-10 text-sm">
            I will bring your vision to life with creativity and precision. Let&apos;s make it happen.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="mb-16">
            <AnimatedButton href="#contact" variant="default" size="default">
              Let&apos;s Talk
            </AnimatedButton>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-10">
            <Link href="#why-me" className="text-white hover:text-gray-300 transition-colors text-sm">
              Why Me
            </Link>
            <Link href="#portfolio" className="text-white hover:text-gray-300 transition-colors text-sm">
              Portfolio
            </Link>
            <Link href="#testimonials" className="text-white hover:text-gray-300 transition-colors text-sm">
              Testimonials
            </Link>
            <Link href="#faqs" className="text-white hover:text-gray-300 transition-colors text-sm">
              FAQs
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemVariants} className="text-gray-600 text-xs">
            Copyright OmniVision. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
