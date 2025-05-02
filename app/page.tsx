"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import PortfolioSection from "@/components/portfolio-section"
import ClientsSection from "@/components/clients-section"
import TestimonialSection from "@/components/testimonial-section"
import FaqSection from "@/components/faq-section"
import CTAFooter from "@/components/cta-footer"
import { BackgroundGrid } from "@/components/background-grid"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    // Preload any assets if needed
    const preloadImages = () => {
      // Add any image preloading logic here
    }
    preloadImages()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <BackgroundGrid />
      <div className="relative z-10">
        <Navbar />
        <main>
          <motion.div style={{ opacity }}>
            <HeroSection />
          </motion.div>
          <PortfolioSection />
          <ClientsSection />
          <TestimonialSection />
          <FaqSection />
        </main>
        <CTAFooter />
      </div>
    </div>
  )
}
