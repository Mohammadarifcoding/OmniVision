"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How much do you charge per video?",
    answer:
      "It depends on the type and length of the video. I keep pricing fair and flexible — hit me up and we'll work it out.",
  },
  {
    id: 2,
    question: "How long does it take to finish an edit?",
    answer: "Most edits are done in 2-3 days. Need it faster? Just let me know.",
  },
  {
    id: 3,
    question: "Do you offer revisions?",
    answer: "Yes! I want you to be happy with the final video. Small changes are totally fine.",
  },
  {
    id: 4,
    question: "What formats do you deliver in?",
    answer: "I can deliver in any format you need - MP4, MOV, AVI, and more. Just let me know your requirements.",
  },
  {
    id: 5,
    question: "Do you handle audio editing as well?",
    answer:
      "Audio is a crucial part of any video. I provide complete audio editing, mixing, and can even help with music selection.",
  },
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
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
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section id="faqs" ref={ref} className="py-20 md:py-32 overflow-hidden">
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
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-red-600 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              custom={index}
              className="mb-8"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className={`rounded-2xl overflow-hidden shadow-md transition-colors duration-200 ${
                  activeIndex === index ? "bg-gray-800" : "bg-gray-900"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left px-8 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      activeIndex === index ? "bg-red-500" : "bg-gray-700"
                    } text-white`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {activeIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </motion.div>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4 },
                          opacity: { duration: 0.3, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.4 },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-4 border-t border-gray-700">
                        <p className="text-gray-200 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}