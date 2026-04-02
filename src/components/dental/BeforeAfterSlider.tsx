"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Después",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    },
    [isDragging, updateSliderPosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    },
    [isDragging, updateSliderPosition]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl cursor-ew-resize select-none ${className}`}
      data-cursor
      data-cursor-text="Arrastra"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${afterImage})` }}
        />
        <div className="absolute bottom-3 right-3 bg-[#1A3326]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white text-xs font-medium">{afterLabel}</span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${beforeImage})` }}
        />
        <div className="absolute bottom-3 left-3 bg-[#D9C7AA]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-[#1A3326] text-xs font-medium">{beforeLabel}</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#D9C7AA]">
          <span className="text-[#1A3326] text-xs">↔</span>
        </div>
      </div>
    </div>
  );
}

// Showcase section
const cases = [
  {
    before: "./before-1.jpg",
    after: "./after-1.jpg",
    title: "Blanqueamiento LED",
    description: "Resultados visibles en una sesión",
  },
  {
    before: "./before-2.jpg",
    after: "./after-2.jpg",
    title: "Diseño de Sonrisa",
    description: "Transformación con carillas",
  },
  {
    before: "./before-3.jpg",
    after: "./after-3.jpg",
    title: "Ortodoncia Invisible",
    description: "Alineación perfecta en 12 meses",
  },
];

export function BeforeAfterShowcase() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#8B8680] text-xs uppercase tracking-[0.3em] mb-4"
          >
            Casos de Éxito
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3326] font-light"
          >
            Transformaciones{" "}
            <span className="italic text-[#D9C7AA]">Reales</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-3 shadow-sm"
            >
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
              />
              <div className="px-2 py-4">
                <h3 className="font-serif text-lg md:text-xl text-[#1A3326] mb-1">
                  {item.title}
                </h3>
                <p className="text-[#8B8680] text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
