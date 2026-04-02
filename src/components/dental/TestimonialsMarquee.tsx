"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/** Frases destacadas que se muestran en el marquee */
const phrases = [
  "★ Sonrisas que transforman vidas",
  "★ Implantes de precisión",
  "★ Ortodoncia invisible",
  "★ Diseño digital de sonrisa",
  "★ Blanqueamiento profesional",
  "★ 15 años de excelencia",
  "★ 2.500+ pacientes felices",
  "★ Tecnología de vanguardia",
];

interface TestimonialsMarqueeProps {
  /** Velocidad en segundos para recorrer el 50% del track */
  speed?: number;
  /** Si va de derecha a izquierda (default) o al revés */
  reverse?: boolean;
  /** Colores del tema */
  bgColor?: string;
  textColor?: string;
  /** Frases o marcas a mostrar, por defecto usa phrases */
  items?: string[];
}

export function TestimonialsMarquee({
  speed = 30,
  reverse = false,
  bgColor = "#1A3326",
  textColor = "#D9C7AA",
  items = phrases,
}: TestimonialsMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Aseguramos animar exactamente el ancho de un bloque (que es el 50% del trackRef)
    const direction = reverse ? "50%" : "-50%";

    // Configuramos posición inicial según la dirección
    if (reverse) {
      gsap.set(track, { x: "-50%" });
    } else {
      gsap.set(track, { x: "0%" });
    }

    tweenRef.current = gsap.to(track, {
      x: reverse ? "0%" : "-50%",
      duration: speed,
      ease: "none",
      repeat: -1, // Infinito
    });

    // Pausa al hover para UX
    const handleEnter = () => tweenRef.current?.pause();
    const handleLeave = () => tweenRef.current?.resume();

    track.parentElement?.addEventListener("mouseenter", handleEnter);
    track.parentElement?.addEventListener("mouseleave", handleLeave);

    return () => {
      tweenRef.current?.kill();
      track.parentElement?.removeEventListener("mouseenter", handleEnter);
      track.parentElement?.removeEventListener("mouseleave", handleLeave);
    };
  }, [speed, reverse]);

  // Cuadruplicamos la lista original para formar UN bloque que asegure llenar pantallas grandes completas
  const blockItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden py-4 flex"
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex gap-0 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {/* Bloque 1 */}
        <div className="flex shrink-0">
          {blockItems.map((phrase, i) => (
            <span
              key={`b1-${i}`}
              className="text-sm md:text-base font-medium tracking-[0.15em] uppercase px-8 inline-block"
              style={{ color: textColor }}
            >
              {phrase}
            </span>
          ))}
        </div>
        {/* Bloque 2 (Clon perfecto del Bloque 1 para loop impecable) */}
        <div className="flex shrink-0">
          {blockItems.map((phrase, i) => (
            <span
              key={`b2-${i}`}
              className="text-sm md:text-base font-medium tracking-[0.15em] uppercase px-8 inline-block"
              style={{ color: textColor }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
