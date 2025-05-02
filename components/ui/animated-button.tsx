"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
  className?: string
  icon?: boolean
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ href, variant = "default", size = "default", children, className, icon = true, ...props }, ref) => {
    // Button variants
    const variants = {
      default: "bg-black text-white border border-gray-800 hover:bg-black/80",
      outline: "border border-gray-800 bg-transparent text-white hover:bg-white/5",
      ghost: "bg-transparent text-white hover:bg-white/5",
    }

    // Button sizes
    const sizes = {
      default: "h-11 px-6 py-2 text-base rounded-md",
      sm: "h-9 px-4 py-1 text-sm rounded-md",
      lg: "h-12 px-8 py-3 text-lg rounded-md",
    }

    // Animation variants
    const buttonAnimationVariants = {
      initial: {
        scale: 1,
      },
      hover: {
        scale: 1.02,
      },
      tap: {
        scale: 0.98,
      },
    }

    const arrowAnimationVariants = {
      initial: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.2 },
      },
      hover: {
        x: 3,
        opacity: 1,
        transition: { duration: 0.2 },
      },
    }

    const ButtonContent = (
      <>
        <span className="relative z-10">{children}</span>
        {icon && (
          <motion.span
            className="ml-1 inline-flex"
            variants={arrowAnimationVariants}
            initial="initial"
            animate="initial"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        )}
      </>
    )

    if (href) {
      return (
        <Link href={href} className="inline-block">
          <motion.div
            className={cn(
              "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50",
              variants[variant],
              sizes[size],
              className,
            )}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonAnimationVariants}
          >
            {ButtonContent}
          </motion.div>
        </Link>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimationVariants}
        {...props}
      >
        {ButtonContent}
      </motion.button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"
