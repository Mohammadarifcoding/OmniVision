"use client"

import { useEffect, useRef } from "react"

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up canvas for high DPI displays
    const setupCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio || 1

      // Set display size
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio

      // Normalize coordinate system to use CSS pixels
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    const resizeCanvas = () => {
      setupCanvas()
      drawDots()
    }

    const drawDots = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set dot properties - exact match to ApexVision
      const spacing = 12 // Smaller spacing for denser grid
      const dotSize = 0.35 // Smaller dots for exact match

      // Draw regular dots - using very light gray color with low opacity
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)" // Very subtle white dots

      for (let x = 0; x <= window.innerWidth; x += spacing) {
        for (let y = 0; y <= window.innerHeight; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ pointerEvents: "none" }} />
      <div className="absolute inset-0 bg-black" style={{ zIndex: -1 }} />
    </div>
  )
}
