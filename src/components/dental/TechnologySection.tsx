"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Cpu, Microscope, Radio, Shield, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    icon: Scan,
    title: "Scanner Intraoral 3D",
    description: "Digitalización precisa en segundos. Sin moldes incómodos.",
    image: "/tech-scanner.jpg",
  },
  {
    icon: Cpu,
    title: "Diseño CAD/CAM",
    description: "Fabricación digital de restauraciones en el mismo día.",
    image: "/tech-cad.jpg",
  },
  {
    icon: Microscope,
    title: "Microscopía Dental",
    description: "Precisión milimétrica en cada procedimiento.",
    image: "/tech-micro.jpg",
  },
  {
    icon: Radio,
    title: "Radiografía 3D",
    description: "Diagnósticos precisos con mínima radiación.",
    image: "/tech-xray.jpg",
  },
  {
    icon: Shield,
    title: "Esterilización Clase B",
    description: "Máxima seguridad con protocolos internacionales.",
    image: "/tech-steril.jpg",
  },
  {
    icon: Zap,
    title: "Láser Dental",
    description: "Tratamientos menos invasivos y recuperación rápida.",
    image: "/tech-laser.jpg",
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Animación #5: Pin con ScrollTrigger GSAP + Progress Line ───────────────
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !pinWrapper || !progressLine) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Inicializar la línea de progreso en 0
      gsap.set(progressLine, { scaleY: 0, transformOrigin: "top center" });

      const totalItems = technologies.length;
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * (totalItems - 1)}`,
        pin: pinWrapper,       // Pinar el panel interior, no toda la section
        anticipatePin: 1,
        scrub: 0.8,
        onUpdate: (self) => {
          // Actualizar índice activo según progreso del scroll
          const newIndex = Math.min(
            Math.floor(self.progress * totalItems),
            totalItems - 1
          );
          setActiveIndex(newIndex);

          // Animar la línea de progreso
          gsap.to(progressLine, {
            scaleY: self.progress,
            duration: 0.2,
            ease: "none",
            overwrite: true,
          });
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .tech-section-height {
            min-height: ${technologies.length * 100}vh;
          }
        }
      `}</style>
      <section
        ref={sectionRef}
        id="tecnologia"
        className="relative bg-[#1A3326] tech-section-height"
      >
      {/* Fondos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D9C7AA]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#2A4A3A]/50 rounded-full blur-3xl" />
      </div>

      {/* Panel interior: este se pina en desktop */}
      <div
        ref={pinWrapperRef}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 lg:h-screen lg:flex lg:flex-col lg:justify-center"
      >
        {/* Encabezado */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#D9C7AA] text-xs uppercase tracking-[0.3em] mb-4"
          >
            Tecnología de Vanguardia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light"
          >
            Innovación para tu{" "}
            <span className="italic text-[#D9C7AA]">bienestar</span>
          </motion.h2>
        </div>

        {/* Layout desktop: imagen sticky + texto scrollable */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Columna izquierda: imagen con AnimatePresence */}
          <div className="relative h-[50vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${technologies[activeIndex].image})` }}
                />
                <div className="absolute inset-0 bg-[#1A3326]/30" />

                {/* Ícono + texto en overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#D9C7AA]/20 backdrop-blur-sm flex items-center justify-center">
                      {(() => {
                        const Icon = technologies[activeIndex].icon;
                        return <Icon className="w-6 h-6 text-[#D9C7AA]" />;
                      })()}
                    </div>
                    <div>
                      <p className="font-serif text-2xl text-white">
                        {technologies[activeIndex].title}
                      </p>
                      <p className="text-white/60 text-sm">
                        {technologies[activeIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Línea de progreso GSAP (#5) ── */}
            <div className="absolute -right-8 top-0 bottom-0 flex flex-col items-center gap-0">
              {/* Track gris */}
              <div className="relative w-0.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                {/* Fill animado por GSAP */}
                <div
                  ref={progressLineRef}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-[#D9C7AA] rounded-full origin-top"
                />
              </div>
              {/* Puntos indicadores */}
              <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-between py-1">
                {technologies.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full -translate-x-[3px] transition-colors duration-300"
                    style={{
                      backgroundColor:
                        i <= activeIndex
                          ? "rgb(217,199,170)"
                          : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: lista de ítems activos/inactivos */}
          <div className="space-y-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.3,
                  x: index === activeIndex ? 0 : -8,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="cursor-default"
              >
                <div className="flex items-center gap-4 mb-2">
                  <tech.icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{
                      color:
                        index === activeIndex
                          ? "rgb(217,199,170)"
                          : "rgba(255,255,255,0.4)",
                    }}
                  />
                  <span className="text-[#8B8680] text-sm">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white font-light mb-1">
                  {tech.title}
                </h3>
                <p className="text-white/60 text-base max-w-md">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: grid simple */}
        <div className="lg:hidden grid gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${tech.image})` }}
                />
                <div className="absolute inset-0 bg-[#1A3326]/40" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-[#D9C7AA]/20 backdrop-blur-sm flex items-center justify-center">
                  <tech.icon className="w-5 h-5 text-[#D9C7AA]" />
                </div>
              </div>
              <h3 className="font-serif text-xl text-white mb-1">{tech.title}</h3>
              <p className="text-white/60 text-sm">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
