"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Palabras del título separadas para el split stagger
const titleWords = ["Diseñamos", "tu", "mejor", "versión"];
// Palabras que llevan estilo especial
const italicWords = new Set(["mejor", "versión"]);
const goldWords = new Set(["versión"]);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref del contenedor del título para GSAP
  const titleRef = useRef<HTMLDivElement>(null);
  // Ref de la imagen de fondo para parallax GSAP
  const bgRef = useRef<HTMLDivElement>(null);
  // Ref del contenido de texto para parallax leve
  const textRef = useRef<HTMLDivElement>(null);
  // Refs de círculos decorativos
  const circleTopRef = useRef<HTMLDivElement>(null);
  const circleBotRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Opacidad del overlay al hacer scroll (Framer Motion)
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // ── Animación #1: Text Split Stagger (GSAP) ────────────────────────────────
  useLayoutEffect(() => {
    const spans = titleRef.current?.querySelectorAll<HTMLElement>(".word-span");
    if (!spans || spans.length === 0) return;

    // Asegurar estado inicial oculto
    gsap.set(spans, { y: "110%", opacity: 0 });

    // Stagger de entrada una vez que el componente monta
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(spans, {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "expo.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  // ── Animación #6: Parallax Multi-capa (GSAP ScrollTrigger) ────────────────
  useLayoutEffect(() => {
    const bg = bgRef.current;
    const text = textRef.current;
    const circleTop = circleTopRef.current;
    const circleBot = circleBotRef.current;
    const container = containerRef.current;
    if (!bg || !text || !container) return;

    // Imagen de fondo: se mueve más rápido (efecto profundidad)
    const tBg = gsap.to(bg, {
      y: "40%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Texto principal: movimiento intermedio
    const tText = gsap.to(text, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Círculos decorativos: movimiento opuesto (sensación de profundidad)
    const tCircleTop = circleTop
      ? gsap.to(circleTop, {
          y: "-12%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      : null;

    const tCircleBot = circleBot
      ? gsap.to(circleBot, {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      : null;

    return () => {
      tBg.kill();
      tText.kill();
      tCircleTop?.kill();
      tCircleBot?.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.vars.trigger === container ||
          t.vars.trigger === bg ||
          t.vars.trigger === text
        ) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Fondo cinematic con parallax GSAP (#6) ── */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./')" }}
        />
        <div className="hero-overlay" />
        {/* Textura grain sutil */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ── Círculos decorativos con parallax opuesto ── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div
          ref={circleTopRef}
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] border border-[#D9C7AA]/10 rounded-full will-change-transform"
        />
        <div
          ref={circleBotRef}
          className="absolute bottom-[30%] right-[15%] w-[200px] h-[200px] border border-[#D9C7AA]/5 rounded-full will-change-transform"
        />
      </div>

      {/* ── Contenido principal con parallax suave ── */}
      <motion.div
        ref={textRef}
        className="relative z-20 text-center px-4 max-w-7xl mx-auto will-change-transform pb-24 md:pb-0 pt-16 md:pt-0"
        style={{ opacity }}
      >
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#D9C7AA] font-medium tracking-[0.4em] uppercase text-xs md:text-sm mb-8 md:mb-12"
        >
          Clínica Dental Premium · Villa Mercedes
        </motion.p>

        {/* ── Título con Text Split GSAP (#1) ── */}
        <div ref={titleRef} className="mb-8 md:mb-12">
          {/* Línea 1: "Diseñamos tu" */}
          <div className="overflow-hidden">
            <h1 className="font-serif text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] text-white font-light leading-[0.85] tracking-[-0.03em]">
              {titleWords.slice(0, 2).map((word) => (
                <span key={word} className="inline-block overflow-hidden mr-[0.15em]">
                  <span
                    className={`word-span inline-block${
                      italicWords.has(word) ? " italic" : ""
                    }${goldWords.has(word) ? " text-[#D9C7AA]" : ""}`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          {/* Línea 2: "mejor versión" */}
          <div className="overflow-hidden">
            <h1 className="font-serif text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] text-white font-light leading-[0.85] tracking-[-0.03em]">
              {titleWords.slice(2).map((word) => (
                <span key={word} className="inline-block overflow-hidden mr-[0.15em]">
                  <span
                    className={`word-span inline-block${
                      italicWords.has(word) ? " italic" : ""
                    }${goldWords.has(word) ? " text-[#D9C7AA]" : ""}`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/70 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-10 md:mb-14 font-light leading-relaxed"
        >
          Odontología de precisión con estética de autor.
          <br />
          Tecnología de vanguardia y experiencia humanizada.
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            variant="primary"
            size="lg"
            href="https://wa.me/5492657123456?text=Hola,%20me%20gustaría%20agendar%20una%20consulta"
            className="bg-[#D9C7AA] text-[#1A3326] hover:bg-[#FBF9F6] border-2 border-[#D9C7AA] min-w-[200px]"
          >
            <Calendar className="w-5 h-5" />
            Agendar Consulta
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            className="text-white border-white/30 hover:border-white hover:text-white min-w-[200px]"
          >
            Conocer Más
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </motion.div>
      </motion.div>



      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() =>
            document
              .getElementById("tratamientos")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">
            Descubre
          </span>
          {/* Chevron SVG inline */}
          <svg
            className="w-4 h-4 text-[#D9C7AA] group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Decoración lateral */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#D9C7AA]/30 to-transparent" />
          <span className="text-white/30 text-[10px] tracking-widest rotate-[-90deg] origin-center whitespace-nowrap">
            SCROLL
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#D9C7AA]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
