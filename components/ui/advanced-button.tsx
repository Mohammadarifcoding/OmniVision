"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-black text-white border border-gray-800 hover:bg-black/80",
        primary: "bg-blue-600 text-white hover:bg-red-700",
        outline: "border border-gray-800 bg-transparent text-white hover:bg-white/5",
        ghost: "bg-transparent text-white hover:bg-white/5",
        link: "text-white underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-11 px-6 py-2 text-base",
        sm: "h-9 px-4 py-1 text-sm",
        lg: "h-12 px-8 py-3 text-lg",
        icon: "h-9 w-9",
      },
      radius: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
      hasArrow: {
        true: "pr-10", // Extra padding for arrow
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      hasArrow: false,
    },
  },
)

export interface AdvancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  showArrow?: boolean
}

const AdvancedButton = React.forwardRef<HTMLButtonElement, AdvancedButtonProps>(
  ({ className, variant, size, radius, hasArrow, showArrow, children, href, ...props }, ref) => {
    // Animation variants
    const buttonAnimationVariants = {
      rest: {
        scale: 1,
      },
      hover: {
        scale: 1.02,
        transition: { duration: 0.2 },
      },
      tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
      },
    }

    const arrowAnimationVariants = {
      rest: {
        x: 0,
        opacity: showArrow ? 1 : 0,
        transition: { duration: 0.2 },
      },
      hover: {
        x: 3,
        opacity: 1,
        transition: { duration: 0.2 },
      },
    }

    const glowVariants = {
      rest: {
        opacity: 0,
        scale: 0.8,
      },
      hover: {
        opacity: 0.1,
        scale: 1.1,
        transition: { duration: 0.3 },
      },
    }

    const ButtonComponent = (
      <motion.button
        className={cn(buttonVariants({ variant, size, radius, hasArrow, className }))}
        ref={ref}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimationVariants}
        {...props}
      >
        <motion.span className="relative z-10 flex items-center justify-center">
          {children}
          {(showArrow || hasArrow) && (
            <motion.span className="ml-2 inline-flex" variants={arrowAnimationVariants}>
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          )}
        </motion.span>
        <motion.span className="absolute inset-0 bg-white/10 rounded-inherit" variants={glowVariants} />
      </motion.button>
    )

    if (href) {
      return (
        <a href={href} className="inline-flex">
          {ButtonComponent}
        </a>
      )
    }

    return ButtonComponent
  },
)
AdvancedButton.displayName = "AdvancedButton"

export { AdvancedButton, buttonVariants }
