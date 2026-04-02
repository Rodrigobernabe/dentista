"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main cursor - faster follow
  const springConfigMain = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfigMain);
  const cursorYSpring = useSpring(cursorY, springConfigMain);

  // Trailing cursor - slower follow
  const springConfigTrail = { damping: 30, stiffness: 150 };
  const trailXSpring = useSpring(cursorX, springConfigTrail);
  const trailYSpring = useSpring(cursorY, springConfigTrail);

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    // Only on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => moveCursor(e);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorText = target.getAttribute("data-cursor-text");

      if (target.closest("a, button, [data-cursor]")) {
        setIsHovering(true);
        if (cursorText) {
          setHoverText(cursorText);
        } else if (target.closest("a")) {
          setHoverText("Ver");
        } else if (target.closest("button")) {
          setHoverText("Click");
        } else {
          setHoverText("");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverText("");
    };

    window.addEventListener("mousemove", handleMouseMove);

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [moveCursor]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Trailing ring - slower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-full border border-[#D9C7AA]/20" />
        </motion.div>
      </motion.div>

      {/* Main cursor - dot + ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 60 : 20,
            height: isHovering ? 60 : 20,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#1A3326] rounded-full"
            animate={{
              opacity: isHovering ? 0 : 1,
            }}
          />

          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#1A3326]"
            animate={{
              borderColor: isHovering ? "#D9C7AA" : "#1A3326",
              backgroundColor: isHovering ? "rgba(217, 199, 170, 0.1)" : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Hover text */}
          {isHovering && hoverText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-[10px] font-semibold text-[#1A3326] uppercase tracking-wider">
                {hoverText}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
