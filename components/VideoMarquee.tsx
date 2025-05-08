"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { Play } from "lucide-react"
import YouTubePlayer from "./youtube-player"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  videoId: string
  views?: string
}

interface VideoMarqueeProps { videos: Video[], direction: "right" | "left"} 

export default function VideoMarquee({ videos, direction ="right"}: VideoMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const extended = [...videos, ...videos]

  return (
    <div
      ref={marqueeRef}
      className="relative overflow-hidden "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Marquee direction={direction} speed={40} play={!isPaused} gradient={false}>
        <div className="flex ">
          {extended.map((vid, idx) => {
            const baseIdx = idx % videos.length
            const isPlaying = playingIndex === idx

            return (
              <motion.div
                key={`${vid.id}-${idx}`}
                className="group w-[300px] md:w-[500px] flex-shrink-0"
                initial="rest"
                whileHover="rest"
                animate="rest"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                  {isPlaying ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <YouTubePlayer
                        videoId={vid.videoId}
                        title={vid.title}
                        autoplay={true}
                      />
                    </motion.div>
                  ) : (
                    <>
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setPlayingIndex(idx)}
                          className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
                          aria-label="Play video"
                        >
                          <Play className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="font-bold text-white text-lg truncate">{vid.title}</h3>
                        {vid.views && (
                          <p className="text-gray-400 text-xs">{vid.views}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Marquee>
    </div>
  )
}