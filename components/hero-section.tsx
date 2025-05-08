"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smoother animations with spring physics
  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 400]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0]),
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    }
  );

  return (
    <motion.section
  id="home"
  layout
  initial={{ height: 0 }}
  animate={{ height: 'auto' }}
  transition={{ duration: 1 }}
      ref={ref}
      className="relative md:py-40 sm:py-32 py-24 min-h-fit  flex flex-col items-center justify-center px-4 overflow-hidden"

    >
      <motion.div
        style={{ y: -smoothY, opacity: smoothOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Small tag line with dot */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-8 border-white/10 bg-[#050505] backdrop-blur-2xl py-1 px-3 rounded-full transition-all duration-300 max-w-fit mx-auto border-2 border-t-[3px]"
        >
          <div className="relative inline-flex w-[10px] h-[10px]">
            {/* ping halo */}
            <span
              className="
      absolute inset-0 
      rounded-full 
      bg-red-600 
      opacity-75 
      animate-ping
    "
            ></span>
            {/* solid dot */}
            <span
              className="
      relative 
      inline-flex 
      w-full 
      h-full 
      rounded-full 
      bg-red-600
    "
            ></span>
          </div>

          <span className="text-gray-400 text-sm">Get your Editing Done</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="sm:text-5xl text-4xl md:text-7xl font-bold mb-4 text-red-600 "
        >
          Omni Vision
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="sm:text-3xl text-2xl md:text-5xl font-medium mb-4 text-white"
        >
          Top-notch <span className="inline-block mx-2">✦</span> Quality.
        </motion.h2>

        {/* Tagline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="sm:text-3xl text-2xl md:text-5xl font-bold sm:mb-8 mb-4 text-red-600"
        >
          I&apos;m unmatched.
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-gray-400 sm:text-lg text-base sm:mb-12 mb-6"
        >
          Design services at your fingertips. Pause or cancel anytime.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="inline-block"
        >
          <AnimatedButton variant="default" size="lg" href="#portfolio">
            Portfolio
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
