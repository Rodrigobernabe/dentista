"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ToothSVGProps {
  className?: string;
  /** Color del trazo */
  strokeColor?: string;
  /** Tamaño en px */
  size?: number;
}

/**
 * SVG estilizado de un diente que se dibuja con GSAP strokeDashoffset
 * al entrar al viewport.
 */
export function ToothSVG({
  className = "",
  strokeColor = "#D9C7AA",
  size = 120,
}: ToothSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = pathsRef.current.filter(Boolean);
    if (paths.length === 0) return;

    // Calcular la longitud de cada path para el dash trick
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
    });

    // ScrollTrigger: animar cuando el svg entra al viewport
    const st = ScrollTrigger.create({
      trigger: svg,
      start: "top 85%",
      onEnter: () => {
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.3,
          ease: "power2.inOut",
        });
      },
      once: true,
    });

    return () => {
      st.kill();
    };
  }, []);

  // Función para guardar refs de paths
  const setPathRef = (index: number) => (el: SVGPathElement | null) => {
    if (el) pathsRef.current[index] = el;
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Corona del diente — path principal */}
      <path
        ref={setPathRef(0)}
        d="M20 35 C20 20 30 10 40 12 C45 13 48 18 50 18 C52 18 55 13 60 12 C70 10 80 20 80 35 C80 50 75 65 70 72 C67 76 64 78 62 76 C59 73 57 68 55 65 C53 62 51 60 50 60 C49 60 47 62 45 65 C43 68 41 73 38 76 C36 78 33 76 30 72 C25 65 20 50 20 35 Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0}
      />
      {/* Línea central vertical (división de cúspides) */}
      <path
        ref={setPathRef(1)}
        d="M50 18 C50 35 50 50 50 60"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0}
        strokeDasharray="3 4"
      />
      {/* Reflejo/brillo superior izquierdo */}
      <path
        ref={setPathRef(2)}
        d="M30 20 C34 17 38 15 42 15"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0}
      />
    </svg>
  );
}
