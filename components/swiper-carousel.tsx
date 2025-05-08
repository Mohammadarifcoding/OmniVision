"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, X } from "lucide-react"
import { AnimatedButton } from "./ui/animated-button"

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
  {
    id: 6,
    title: "The Rise of Indie Game Development",
    description: "Gaming documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoUrl: "#",
  },
]

export default function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

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
        duration: 0.5,
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
          variants={containerVariants}
          className="max-w-[1400px] mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedVideo(index)}
                >
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="font-bold text-white text-lg truncate">{video.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-gray-300 text-sm">{video.description}</p>
                      {video.views && <p className="text-gray-400 text-xs">{video.views}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <AnimatedButton href="#contact" variant="default" size="default">
              See More Work
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{videos[selectedVideo].title}</h3>
                <p className="text-gray-400 mb-6">{videos[selectedVideo].description}</p>
                <div className="inline-block">
                  <AnimatedButton variant="default" size="default">
                    Play Video
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
