"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "LilyGumdrop",
    role: "Content Creator",
    company: "LilyGumdrop",
    avatar: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549963/LilyGumdrop_high_ynlbe9.jpg",
    content:
      "I was so worried our video would look boring, but Jisan from OmniVision turned it into something amazing! He really got what we wanted, and watching it felt like a happy memory. I can’t thank him enough!",
    rating: 5,
  },
  {
    id: 2,
    name: "Graser",
    role: "Content Creator",
    company: "Graser",
    avatar: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549972/Graser_high_ax0dhe.jpg",
    content:
      "Jisan at OmniVision made our event video feel so special. It’s like he caught all the fun moments, and every time I watch it, I feel like I’m back there laughing again super cool!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amin",
    role: "CEO",
    company: "AminOnPC",
    avatar: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549955/AminOnPC_high_wlf3j5.jpg",
    content:
      "Our product launch video needed to be perfect, and OmniVision delivered beyond expectations. The storytelling through visuals was impressive, and the turnaround time was faster than we anticipated.",
    rating: 5,
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating && document.visibilityState === "visible") {
        nextTestimonial()
      }
    }, 8000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAnimating])

  // Pause auto-advance when user interacts
  const handleUserInteraction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (!isAnimating && document.visibilityState === "visible") {
        nextTestimonial()
      }
    }, 8000)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  }

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex space-x-1 justify-center items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    )
  }

  // Pagination indicators
  const Pagination = () => (
    <div className="flex justify-center mt-8 space-x-2">
      {testimonials.map((_, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-red-500" : "bg-gray-600"}`}
          onClick={() => {
            if (isAnimating) return
            handleUserInteraction()
            setIsAnimating(true)
            setDirection(index > currentIndex ? 1 : -1)
            setCurrentIndex(index)
            setTimeout(() => setIsAnimating(false), 500)
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  )

  return (
    <section id="feedback" ref={sectionRef} className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            What Clients Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[300px] md:min-h-[250px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800">
                  <div className="flex flex-col items-center text-center">
                    <Quote className="w-12 h-12 text-red-500 mb-6 opacity-50" />

                    <p className="text-lg md:text-xl text-gray-200 mb-8 italic">
                      "{testimonials[currentIndex].content}"
                    </p>

                    <Avatar className="w-16 h-16 border-2 border-red-500">
                      <AvatarImage
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                      />
                      <AvatarFallback>{testimonials[currentIndex].name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="mt-4">
                      <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-400">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                      <div className="mt-2">
                        <StarRating rating={testimonials[currentIndex].rating} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <motion.button
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900/50 border border-gray-700 flex items-center justify-center text-red-400 hover:bg-red-900/20 hover:border-red-500 transition-all duration-300"
            onClick={() => {
              prevTestimonial()
              handleUserInteraction()
            }}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Previous testimonial</span>
          </motion.button>

          <motion.button
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900/50 border border-gray-700 flex items-center justify-center text-red-400 hover:bg-red-900/20 hover:border-red-500 transition-all duration-300"
            onClick={() => {
              nextTestimonial()
              handleUserInteraction()
            }}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
            <span className="sr-only">Next testimonial</span>
          </motion.button>

          <Pagination />
        </div>
      </div>
    </section>
  )
}
