"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Smoother animations with spring physics
  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Small tag line with dot */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span className="text-gray-400 text-sm">Get your Editing Done</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-red-600"
        >
          Omni Vision
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-3xl md:text-5xl font-medium mb-4 text-white"
        >
          Top-notch <span className="inline-block mx-2">✦</span> Quality.
        </motion.h2>

        {/* Tagline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-8 text-red-600"
        >
          I&apos;m unmatched.
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-gray-400 text-lg mb-12"
        >
          Design services at your fingertips. Pause or cancel anytime.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="inline-block"
        >
          <AnimatedButton variant="default" size="lg" href="#portfolio">
            Portfolio
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
