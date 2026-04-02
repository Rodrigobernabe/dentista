"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

interface Treatment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const treatments: Treatment[] = [
  {
    id: "implantes",
    title: "Implantes",
    subtitle: "Dentales",
    description:
      "Recupera tu sonrisa con implantes de última generación. Tecnología 3D para resultados precisos.",
    image: "./treatment-implant.jpg",
  },
  {
    id: "ortodoncia",
    title: "Ortodoncia",
    subtitle: "Invisible",
    description:
      "Sistema Invisalign® certificado. Alineación perfecta sin que nadie lo note.",
    image: "./treatment-ortho.jpg",
  },
  {
    id: "estetica",
    title: "Diseño de Sonrisa",
    subtitle: "Estética",
    description:
      "Carillas de porcelana y estética dental de alta precisión.",
    image: "./treatment-aesthetic.jpg",
  },
  {
    id: "blanqueamiento",
    title: "Blanqueamiento",
    subtitle: "LED Pro",
    description: "Resultados visibles en una hora. Tecnología profesional.",
    image: "./treatment-whitening.jpg",
  },
  {
    id: "general",
    title: "Odontología General",
    subtitle: "Preventiva",
    description: "Cuidado integral para toda la familia.",
    image: "./treatment-general.jpg",
  },
];

// ── Tarjeta individual con Magnetic 3D ────────────────────────────────────────
function TreatmentCard({
  treatment,
  index,
}: {
  treatment: Treatment;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    // Estado inicial: sin transformación
    gsap.set(inner, { rotateX: 0, rotateY: 0, scale: 1 });

    const handleMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Un efecto magnético suave y elegante (reducimos los grados para mantener sobriedad)
      gsap.to(inner, {
        rotateY: relX * 5,
        rotateX: -relY * 4,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleEnter = () => {
      gsap.to(inner, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
      setIsHovered(true);
    };

    const handleLeave = () => {
      gsap.to(inner, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
      setIsHovered(false);
    };

    const card = cardRef.current;
    card?.addEventListener("mousemove", handleMove);
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);

    return () => {
      card?.removeEventListener("mousemove", handleMove);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
      gsap.killTweensOf(inner);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      // Formato apaisado suave o algo vertical según dispositivo
      className="w-full relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[1.2/1]"
      style={{ perspective: "1500px" }}
      data-cursor
      data-cursor-text="Ver"
    >
      <div
        ref={innerRef}
        className="relative w-full h-full bg-[#1A3326]"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${treatment.image})`,
            transform: isHovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* Overlay oscuro para legibilidad (más sutil que antes) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d1a13]/80 via-[#1A3326]/30 to-transparent transition-opacity duration-400"
          style={{ opacity: isHovered ? 0.9 : 0.75 }}
        />

        {/* Borde dorado al hover */}
        <div
          className="absolute inset-0 border-[1px] rounded-[2rem] pointer-events-none transition-colors duration-400"
          style={{
            borderColor: isHovered
              ? "rgba(217,199,170,0.4)"
              : "rgba(255,255,255,0.05)",
          }}
        />

        {/* Contenido (Textos y Flecha) */}
        <div className="relative h-full flex flex-col justify-between p-8 md:p-10 lg:p-12">
          {/* Flecha superior */}
          <div className="flex justify-end">
            <div
              className="w-12 h-12 rounded-full border border-white/20 bg-black/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.9)",
              }}
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Texto inferior */}
          <div>
            <p
              className="text-[#D9C7AA] text-xs md:text-sm uppercase tracking-[0.25em] mb-3 transition-opacity duration-300"
              style={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {treatment.subtitle}
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-4">
              {treatment.title}
            </h3>
            
            <div 
              className="overflow-hidden"
              style={{
                // Animación de aparición de la descripción al hover en desktop
                maxHeight: "100px", 
              }}
            >
              <p
                className="text-white/70 text-sm md:text-base max-w-sm md:max-w-md transition-all duration-500 ease-out"
                style={{
                  opacity: isHovered ? 1 : 0.4,
                  transform: isHovered ? "translateY(0)" : "translateY(10px)",
                }}
              >
                {treatment.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Sección principal: Split Sticky ───────────────────────────────────────────
export function TreatmentsSection() {
  return (
    <section
      id="tratamientos"
      className="py-24 md:py-32 bg-[#FBF9F6] relative border-t border-[#1A3326] / 10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Usamos un grid que en móvil es una columna y en desktop son 12 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Izquierda: Sticky Content */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-40 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-[#D9C7AA]" />
                  <p className="text-[#8B8680] text-sm uppercase tracking-[0.3em]">
                    Nuestros Servicios
                  </p>
                </div>

                <h2 className="font-serif text-5xl md:text-6xl text-[#1A3326] font-light tracking-[-0.02em] mb-8 leading-tight">
                  Tratamientos <br className="hidden lg:block"/> de Autor
                </h2>
                
                <p className="text-[#8B8680] text-lg max-w-md leading-relaxed mb-12">
                  Dedicados a perfeccionar tu sonrisa. Diseñamos planes
                  personalizados combinando precisión técnica, tecnología avanzada y una estética natural excepcional.
                </p>
                
                <a
                  href="#contacto"
                  className="hidden lg:inline-flex items-center gap-3 px-8 py-4 bg-[#1A3326] text-white rounded-full font-medium hover:bg-[#D9C7AA] hover:text-[#1A3326] transition-all duration-300 group"
                >
                  Agendar Evaluación
                  <span className="bg-white/10 group-hover:bg-[#1A3326]/10 p-1.5 rounded-full transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Derecha: Scroll vertical natural de tarjetas */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
            {treatments.map((treatment, index) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                index={index}
              />
            ))}
          </div>

          {/* Botón CTA para Móviles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4 flex flex-col items-center justify-center gap-4 lg:hidden"
          >
            <a
              href="#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1A3326] text-[#FBF9F6] rounded-full font-medium active:scale-95 transition-all"
            >
              Agendar Evaluación
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-[#8B8680] text-sm">Primera consulta gratuita</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
