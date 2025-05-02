"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const clients = [
  { id: 1, name: "Client 1", logo: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Client 2", logo: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Client 3", logo: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Client 4", logo: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Client 5", logo: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Client 6", logo: "/placeholder.svg?height=100&width=100" },
]

export default function ClientsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            The Clients I&apos;ve <span className="text-red-600">worked with</span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-red-600 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              custom={index}
              className="flex items-center justify-center"
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <motion.div
                className="w-24 h-24 md:w-32 md:h-32 bg-gray-900/50 rounded-full p-4 flex items-center justify-center filter grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{
                  boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
                  backgroundColor: "rgba(127, 29, 29, 0.3)",
                }}
              >
                <motion.img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="max-w-full max-h-full"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
