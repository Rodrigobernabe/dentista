"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionWipeProps {
  /** Color de la cortina (default: dorado de la paleta) */
  color?: string;
  /** Dirección de la cortina */
  direction?: "top" | "bottom";
}

/**
 * Componente de transición tipo cortina entre secciones.
 * Usa clip-path animado con GSAP ScrollTrigger (scrub).
 * Coloca este componente entre dos secciones en page.tsx.
 */
export function SectionWipe({
  color = "#1A3326",
  direction = "bottom",
}: SectionWipeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const curtain = curtainRef.current;
    if (!wrapper || !curtain) return;

    // Estado inicial: cortina cubriendo desde abajo
    const initialClip =
      direction === "bottom"
        ? "inset(100% 0 0 0)"
        : "inset(0 0 100% 0)";
    const finalClip = "inset(0% 0 0 0)";

    gsap.set(curtain, { clipPath: initialClip });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 0.6,
      animation: gsap.to(curtain, {
        clipPath: finalClip,
        ease: "none",
      }),
    });

    return () => {
      st.kill();
    };
  }, [direction]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-32 md:h-48 overflow-hidden -mb-1 pointer-events-none"
      aria-hidden="true"
    >
      {/* Cortina animada */}
      <div
        ref={curtainRef}
        className="absolute inset-0"
        style={{ backgroundColor: color }}
      />
      {/* Forma ondulada SVG en el borde */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 40"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
