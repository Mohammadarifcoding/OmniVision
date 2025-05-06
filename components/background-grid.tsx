"use client"

import { useEffect, useRef } from "react"

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width  = w * dpr
      canvas.height = h * dpr

      ctx.scale(dpr, dpr)
    }

    const drawDots = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const spacing = 12
      const dotSize = 0.35
      ctx.fillStyle = "rgba(255,255,255,0.4)"

      for (let x = 0; x <= window.innerWidth; x += spacing) {
        for (let y = 0; y <= window.innerHeight; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const resize = () => {
      setupCanvas()
      drawDots()
    }

    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {/* Canvas dotted grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Uiverse gradient‐radial overlay */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full bg-[#000000]">
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(#2563EB_1px,transparent_1px)]
              [background-size:13px_13px]
              [mask-image:radial-gradient(ellipse_35%_45%_at_47%_49%,#000_0%,transparent_130%)]
            "
          />
        </div>
      </div>
    </div>
  )
}
