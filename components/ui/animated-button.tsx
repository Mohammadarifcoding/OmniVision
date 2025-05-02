"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      href,
      variant = "default",
      size = "default",
      children,
      className,
      icon = true,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-gray-900 text-white border border-gray-800",
      outline: "border border-gray-800 bg-transparent text-white",
      ghost: "bg-transparent text-white",
    };

    const sizes = {
      default: "h-11 px-6 py-2 text-base rounded-xl",
      sm: "h-9 px-4 py-1 text-sm rounded-md",
      lg: "h-12 px-8 py-3 text-lg rounded-xl",
    };

    const buttonAnimationVariants = {
      initial: { scale: 1 },
      hover: { scale: 1.02 },
      tap: { scale: 0.98 },
    };

    const arrowAnimationVariants = {
      initial: { x: 0, opacity: 1, transition: { duration: 0.2 } },
      hover: { x: 3, opacity: 1, transition: { duration: 0.2 } },
    };

    const ButtonInner = (
      <>
        <span className="relative z-10 flex items-center">
          {children}
          {icon && (
            <motion.span
              className="ml-2 inline-flex"
              variants={arrowAnimationVariants}
              initial="initial"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          )}
        </span>
      </>
    );

    const Content = (
      <motion.div
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimationVariants}
        {...(href ? {} : props)}
        ref={ref}
      >
        {ButtonInner}
      </motion.div>
    );

    // Wrap with gradient peel effect
    const Wrapped = (
      <div className="relative inline-flex items-center justify-center group">
        {/* gradient glow blob */}
        <div
    className="
      absolute inset-0 rounded-xl
      bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300
      opacity-30 blur-lg
      transition-all duration-700
      group-hover:opacity-60
    "
    aria-hidden="true"
  />
        {href ? (
          <Link href={href} className="relative z-20">
            {Content}
          </Link>
        ) : (
          Content
        )}
      </div>
    );

    return Wrapped;
  }
);

AnimatedButton.displayName = "AnimatedButton";
