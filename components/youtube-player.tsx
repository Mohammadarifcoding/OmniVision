"use client"

import { useState, useEffect } from "react"

interface YouTubePlayerProps {
  videoId: string
  title?: string
  autoplay?: boolean
}

export default function YouTubePlayer({
  videoId,
  title = "YouTube video player",
  autoplay = true,
}: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset loaded state when video ID changes
    setIsLoaded(false)

    // Small delay to ensure the iframe is properly reset
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [videoId])

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isLoaded && (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?si=yclM9ADjJp0oEgXn${autoplay ? "&autoplay=1" : ""}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      )}
    </div>
  )
}
