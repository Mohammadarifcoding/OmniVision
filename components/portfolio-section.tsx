"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { X, Play } from "lucide-react"
import { AnimatedButton } from "./ui/animated-button"

import YouTubePlayer from "./youtube-player"
import VideoMarquee from "./VideoMarquee"

// Sample video data with real YouTube IDs
const videos = [
  {
    id: 1,
    title: "Baby Im back!",
    description: "Business documentary",
    thumbnail: "https://i.ytimg.com/vi/baqUsdprqHc/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkZZAbcRX1xfcbJNJ8N_kqSrW9xQ",
    videoId: "baqUsdprqHc", // The YouTube video ID you provided
    views: "118 subscribers",
  },
  {
    id: 2,
    title: "Baby Im back!",
    description: "yeah maybe next month",
    thumbnail: "https://i.ytimg.com/vi/baqUsdprqHc/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkZZAbcRX1xfcbJNJ8N_kqSrW9xQ",
    videoId: "baqUsdprqHc", // Using the same ID for demo purposes
  },
  {
    id: 3,
    title: "Baby Im back!",
    description: "yeah maybe next month",
    thumbnail: "https://i.ytimg.com/vi/baqUsdprqHc/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkZZAbcRX1xfcbJNJ8N_kqSrW9xQ",
    videoId: "baqUsdprqHc", // Using the same ID for demo purposes
    views: "118K subscribers",
  },
  {
    id: 4,
    title: "Baby Im back!",
    description: "yeah maybe next month",
    thumbnail: "https://i.ytimg.com/vi/baqUsdprqHc/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkZZAbcRX1xfcbJNJ8N_kqSrW9xQ",
    videoId: "baqUsdprqHc", // Using the same ID for demo purposes
  },
  {
    id: 5,
    title: "Baby Im back!",
    description: "yeah maybe next month",
    thumbnail: "https://i.ytimg.com/vi/baqUsdprqHc/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkZZAbcRX1xfcbJNJ8N_kqSrW9xQ",
    videoId: "baqUsdprqHc", // Using the same ID for demo purposes
  },
  {
    id: 6,
    title: "Baby Im back!",
    description: "yeah maybe next month",
    thumbnail: "https://i.ytimg.com/vi/baqUsdprqHc/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkZZAbcRX1xfcbJNJ8N_kqSrW9xQ",
    videoId: "baqUsdprqHc", // Using the same ID for demo purposes
  },
]

// Group videos into categories


export default function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  // Get the current category's videos
 

  const handleVideoSelect = (index: number) => {
    setSelectedVideo(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Small delay to allow the modal to close before resetting the selected video
    setTimeout(() => {
      setSelectedVideo(null)
    }, 300)
  }

  return (
    <section id="portfolio" ref={ref} className="py-20 md:py-32 overflow-hidden bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center sm:mb-16 mb-10" 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="sm:text-3xl text-2xl md:text-5xl font-bold sm:mb-8 mb-4">
            Some Of My <span className="text-red-600">Best Edited</span> Videos
          </h2>

          {/* Category tabs */}
         
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-[1400px] mx-auto"
        >
          {/* First row - Marquee slider */}
          <motion.div variants={itemVariants} className="mb-16">
            <VideoMarquee videos={videos} direction="left" />
            <VideoMarquee videos={videos} direction="right"  />
          </motion.div>
          <div className="mt-12 text-center">
            <AnimatedButton href="#contact" variant="default" size="default">
              See More Work
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo !== null && isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-4">
              <YouTubePlayer
                videoId={currentCategory.videos[selectedVideo].videoId}
                title={currentCategory.videos[selectedVideo].title}
              />

              <div className="mt-4">
                <h3 className="text-xl font-bold">{currentCategory.videos[selectedVideo].title}</h3>
                <p className="text-gray-400 mt-2">{currentCategory.videos[selectedVideo].description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
