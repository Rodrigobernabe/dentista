"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  /** Valor numérico final */
  value: number;
  /** Sufijo que se muestra después del número (ej: "+", "%") */
  suffix?: string;
  /** Prefijo antes del número (ej: "$") */
  prefix?: string;
  /** Clase CSS adicional para el elemento */
  className?: string;
  /** Duración en segundos de la animación */
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: AnimatedCounterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Objeto proxy que GSAP va a animar
    const counter = { val: 0 };

    // ScrollTrigger: dispara la animación cuando el elemento es visible
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        gsap.to(counter, {
          val: value,
          duration,
          ease: "power2.out",
          snap: { val: 1 }, // Mantiene valores enteros
          onUpdate: () => {
            // Formato con separador de miles
            el.textContent =
              prefix +
              Math.round(counter.val).toLocaleString("es-AR") +
              suffix;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, suffix, prefix, duration]);

  return (
    <span ref={elRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
