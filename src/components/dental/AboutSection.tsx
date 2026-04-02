"use client";

import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedCounter } from "./AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

// Configuración de estadísticas con valores numéricos separados para el contador
const stats = [
  { value: 2500, suffix: "+", label: "Pacientes" },
  { value: 15, suffix: "+", label: "Años" },
  { value: 50, suffix: "+", label: "Certificaciones" },
  { value: 100, suffix: "%", label: "Satisfacción" },
];

const team = [
  {
    name: "Dr. Martín García",
    role: "Director Clínico",
    specialty: "Implantología y Cirugía Oral",
    image: "/team-1.jpg",
  },
  {
    name: "Dra. Lucía Fernández",
    role: "Ortodoncista",
    specialty: "Invisalign® Diamond Provider",
    image: "/team-2.jpg",
  },
  {
    name: "Dr. Pablo Molina",
    role: "Especialista Estética",
    specialty: "Diseño Digital de Sonrisa",
    image: "/team-3.jpg",
  },
];

// ── Tarjeta de miembro del equipo con efecto magnético (Framer Motion) ──────
function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.1);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor
      data-cursor-text="Ver"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white shadow-sm"
        style={{ x: springX, y: springY }}
      >
        {/* Imagen */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${member.image})` }}
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "grayscale(0)" : "grayscale(0.3)",
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#1A3326]/80 via-transparent to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4 text-[#1A3326]" />
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-5 md:p-6">
          <h3 className="font-serif text-lg md:text-xl text-[#1A3326] font-medium mb-1">
            {member.name}
          </h3>
          <p className="text-[#D9C7AA] text-sm font-medium mb-1">{member.role}</p>
          <motion.p
            className="text-[#8B8680] text-sm"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {member.specialty}
          </motion.p>
        </div>

        {/* Borde con efecto hover */}
        <motion.div
          className="absolute inset-0 border border-[#D9C7AA]/0 rounded-2xl pointer-events-none"
          animate={{
            borderColor: isHovered
              ? "rgba(217, 199, 170, 0.4)"
              : "rgba(217, 199, 170, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Sección principal ────────────────────────────────────────────────────────
export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref para las 4 fotos de la grilla (image reveal con GSAP)
  const photosRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // ── Animación #4: Image Reveal con clip-path (GSAP ScrollTrigger) ──────────
  useLayoutEffect(() => {
    const photos = photosRef.current?.querySelectorAll<HTMLElement>(".gsap-photo");
    if (!photos || photos.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    photos.forEach((photo, i) => {
      // Envolver en contenedor con overflow:hidden para el clip
      gsap.set(photo, { clipPath: "inset(0 100% 0 0)" });

      const st = ScrollTrigger.create({
        trigger: photo,
        start: "top 82%",
        onEnter: () => {
          gsap.to(photo, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            delay: i * 0.15,
            ease: "expo.inOut",
          });
        },
        once: true,
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Fondo con parallax (Framer Motion) */}
      <motion.div className="absolute inset-0 z-0" style={{ y: parallaxY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F6] via-[#F0EDE8] to-[#FBF9F6]" />
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#1A3326" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-center mb-20 md:mb-28">
          {/* Grilla de fotos con Image Reveal GSAP */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            ref={photosRef}
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                {/* Foto 1 */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <div
                    className="gsap-photo w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: "url('/clinic-1.jpg')" }}
                  />
                </div>
                {/* Foto 2 */}
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <div
                    className="gsap-photo w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: "url('/clinic-2.jpg')" }}
                  />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 pt-6 md:pt-10">
                {/* Foto 3 */}
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <div
                    className="gsap-photo w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: "url('/clinic-3.jpg')" }}
                  />
                </div>
                {/* Foto 4 */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <div
                    className="gsap-photo w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: "url('/clinic-4.jpg')" }}
                  />
                </div>
              </div>
            </div>

            {/* Badge flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-4 -right-4 md:bottom-6 md:-right-6 bg-white rounded-xl p-4 md:p-5 shadow-lg border border-[#E8EDE6]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D9C7AA]/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#1A3326]" />
                </div>
                <div>
                  <p className="font-serif text-xl text-[#1A3326]">Top 10</p>
                  <p className="text-[#8B8680] text-xs">Argentina 2025</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#8B8680] text-xs uppercase tracking-[0.3em] mb-4">
              Sobre Nosotros
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3326] font-light tracking-[-0.02em] mb-6">
              Excelencia en cada{" "}
              <span className="italic text-[#D9C7AA]">sonrisa</span>
            </h2>
            <p className="text-[#8B8680] text-base md:text-lg mb-6 leading-relaxed">
              Desde 2010, combinamos arte y ciencia para crear sonrisas
              excepcionales. Nuestro enfoque se centra en la atención
              personalizada y el uso de tecnología de vanguardia.
            </p>
            <p className="text-[#8B8680] text-base md:text-lg mb-8 leading-relaxed">
              Cada paciente es único, y nuestro compromiso es entender tus
              necesidades para ofrecerte soluciones que transformen tu calidad de
              vida.
            </p>

            {/* Valores */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "Atención Personalizada",
                "Tecnología de Punta",
                "Resultados Garantizados",
                "Ambiente Premium",
              ].map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9C7AA]" />
                  <span className="text-[#1A3326] text-sm font-medium">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Stats con AnimatedCounter GSAP ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-[#E8EDE6]"
            >
              <p className="font-serif text-3xl md:text-4xl text-[#1A3326] mb-1">
                {/* Animación #3: contador GSAP */}
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              </p>
              <p className="text-[#8B8680] text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Equipo */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <p className="text-[#8B8680] text-xs uppercase tracking-[0.3em] mb-4">
              Nuestro Equipo
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A3326] font-light">
              Profesionales de Excelencia
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
