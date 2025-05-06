"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import SwiperCarousel from "./swiper-carousel"

// Sample video data
const videos = [
  {
    id: 1,
    title: "Grew A $0 Business To 5 Figures In 1 Month (SMMA)",
    description: "Business documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoUrl: "#",
    views: "118 subscribers",
  },
  {
    id: 2,
    title: "Wojak Edit",
    description: "Animation",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoUrl: "#",
  },
  {
    id: 3,
    title: "Can ROBLOX Make A DEAD RAILS Game Without Communicating?",
    description: "Gaming documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoUrl: "#",
    views: "118K subscribers",
  },
  {
    id: 4,
    title: "The DARK Business Of Tennis",
    description: "Sports documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoUrl: "#",
  },
  {
    id: 5,
    title: "What Behind The Piano Brand?",
    description: "Music documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoUrl: "#",
  },
]

export default function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const carouselVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
      },
    },
  }

  return (
    <section id="portfolio" ref={ref} className="py-20 md:py-32 overflow-hidden bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Some Of My <span className="text-red-600">Best Edited</span> Videos
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={carouselVariants}
          className="max-w-[1400px] mx-auto"
        >
          <SwiperCarousel videos={videos} />
        </motion.div>
      </div>
    </section>
  )
}
