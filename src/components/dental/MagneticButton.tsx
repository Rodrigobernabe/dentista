"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const baseStyles = {
    primary:
      "bg-[#D9C7AA] text-[#1A3326] hover:bg-[#FBF9F6]",
    secondary:
      "bg-[#1A3326] text-[#FBF9F6] hover:bg-[#2A4A3A]",
    outline:
      "bg-transparent text-[#1A3326] border border-[#1A3326]/20 hover:border-[#D9C7AA] hover:bg-[#D9C7AA]/10",
    ghost:
      "bg-transparent text-[#1A3326] hover:bg-[#E8EDE6]",
  };

  const sizeStyles = {
    sm: "px-5 py-2.5 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-base rounded-full",
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center gap-2 font-medium overflow-hidden cursor-pointer ${baseStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      data-cursor
    >
      {/* Liquid wave fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          initial={{ height: 0 }}
          animate={{
            height: isHovered && (variant === "outline") ? "100%" : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: "#D9C7AA" }}
        />
        
        {/* Wave effect */}
        <motion.div
          className="absolute bottom-0 left-0 w-[200%] h-[200%] origin-bottom"
          initial={{ rotate: 0 }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            background: variant === "outline" 
              ? "radial-gradient(ellipse at center, rgba(217, 199, 170, 0.3) 0%, rgba(0,0,0,0) 70%)"
              : "rgba(0,0,0,0)",
            opacity: isHovered && variant === "outline" ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}

// Icon button
interface MagneticIconButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticIconButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticIconButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.2);
      y.set((e.clientY - centerY) * 0.2);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const iconContent = (
    <motion.div
      ref={ref}
      className={`w-12 h-12 rounded-full flex items-center justify-center bg-[#1A3326] text-[#D9C7AA] border border-[#D9C7AA]/30 cursor-pointer ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      data-cursor
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">
        {iconContent}
      </a>
    );
  }

  return iconContent;
}
