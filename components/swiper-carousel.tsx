"use client"

import { useState, useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import { Play } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration?: string
  views?: string
}

interface SwiperCarouselProps {
  videos: Video[]
}

export default function SwiperCarousel({ videos }: SwiperCarouselProps) {
  const [domLoaded, setDomLoaded] = useState(false)
  const videoModalRef = useRef<HTMLDivElement>(null)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)

  // Wait for client-side hydration
  useEffect(() => {
    setDomLoaded(true)
  }, [])

  if (!domLoaded) {
    return <div className="h-[500px] flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      <div className="relative max-w-[1400px] mx-auto">
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={30}
          initialSlide={1}
          speed={600}
          loop={true}
          loopAdditionalSlides={2}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} ${
                index === activeVideoIndex ? "bg-blue-600 w-6" : "bg-white/50"
              } transition-all duration-300"></span>`,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => setActiveVideoIndex(swiper.realIndex)}
          className="video-swiper"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={video.id} className="video-slide">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {/* Play button only visible on active slide */}
                <div className="absolute inset-0 flex items-center justify-center play-button-container">
                  <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <Play className="w-8 h-8 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-bold text-white text-xl">"{video.title}"</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-300 text-sm">OmniVision</p>
                    {video.views && <p className="text-gray-400 text-xs">{video.views}</p>}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="swiper-pagination flex justify-center gap-2 mt-6"></div>

        {/* Custom navigation buttons */}
        <button className="swiper-button-prev !text-white !w-10 !h-10 !bg-black/50 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors !left-4 z-20">
          <span className="sr-only">Previous</span>
        </button>
        <button className="swiper-button-next !text-white !w-10 !h-10 !bg-black/50 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors !right-4 z-20">
          <span className="sr-only">Next</span>
        </button>
      </div>

      {/* Video modal (hidden by default) */}
      <div
        ref={videoModalRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 opacity-0 pointer-events-none transition-opacity duration-300"
      >
        <div className="relative w-full max-w-4xl aspect-video">
          <button
            className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
            onClick={() => {
              if (videoModalRef.current) {
                videoModalRef.current.classList.add("opacity-0", "pointer-events-none")
              }
            }}
          >
            Close
          </button>
          <div className="w-full h-full bg-black">
            {/* Video iframe would go here */}
            <div className="flex items-center justify-center h-full text-white">Video player placeholder</div>
          </div>
        </div>
      </div>
    </>
  )
}
