"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  videoUrl: string
}

interface VideoCarouselProps {
  videos: Video[]
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [visibleVideos, setVisibleVideos] = useState<Video[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

  // Set up the visible videos based on the current index
  useEffect(() => {
    const getVisibleVideos = () => {
      const videosCopy = [...videos]
      const prev = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
      const next = currentIndex === videos.length - 1 ? 0 : currentIndex + 1

      return [videosCopy[prev], videosCopy[currentIndex], videosCopy[next]]
    }

    setVisibleVideos(getVisibleVideos())
  }, [currentIndex, videos])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % videos.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && document.visibilityState === "visible") {
        handleNext()
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <div className="relative w-full overflow-hidden" ref={carouselRef}>
      {/* Main carousel */}
      <div className="relative flex items-center justify-center h-[500px] md:h-[600px]">
        {visibleVideos.map((video, index) => {
          const isCenter = index === 1

          return (
            <motion.div
              key={`${video.id}-${index}`}
              className={cn(
                "absolute transition-all duration-500 ease-in-out",
                isCenter ? "z-20 w-[60%]" : "z-10 w-[30%] opacity-60",
              )}
              initial={false}
              animate={{
                left: index === 0 ? "5%" : index === 1 ? "50%" : "75%",
                x: index === 0 ? "0%" : index === 1 ? "-50%" : "-100%",
                scale: isCenter ? 1 : 0.8,
                opacity: isCenter ? 1 : 0.6,
              }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <div
                className={cn(
                  "relative aspect-video overflow-hidden rounded-lg",
                  isCenter ? "shadow-2xl" : "shadow-lg",
                )}
              >
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className={cn("font-bold text-white", isCenter ? "text-xl" : "text-base")}>"{video.title}"</h3>
                  <p className="text-gray-300 text-sm mt-1">OmniVision</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        onClick={handleNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-blue-600 w-6" : "bg-white/50"
            }`}
            onClick={() => {
              if (isAnimating) return
              setIsAnimating(true)
              setCurrentIndex(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
          />
        ))}
      </div>
    </div>
  )
}
