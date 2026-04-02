"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialsMarquee } from "./TestimonialsMarquee";

const testimonials = [
  {
    name: "María González",
    role: "Paciente desde 2018",
    text: "La mejor experiencia dental que he tenido. El equipo es increíble y los resultados superaron todas mis expectativas. El ambiente es completamente diferente a cualquier clínica que conocía.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Implante dental",
    text: "Profesionales de verdad. Me explicaron todo el proceso con paciencia y el resultado fue perfecto. La tecnología que manejan es impresionante. Totalmente recomendado.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Ortodoncia Invisalign",
    text: "Increíble cómo transformaron mi sonrisa en menos de un año. El trato personalizado marca la diferencia. Me sentí acompañada en cada paso del tratamiento.",
    rating: 5,
  },
  {
    name: "Roberto Fernández",
    role: "Diseño de sonrisa",
    text: "Lo que más me impresionó fue la atención al detalle. Cada aspecto de mi tratamiento fue planeado cuidadosamente. El resultado superó mis sueños.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(8px)",
    }),
  };

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#FBF9F6] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#8B8680] text-xs uppercase tracking-[0.3em] mb-4"
          >
            Testimonios
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3326] font-light"
          >
            Lo que dicen nuestros{" "}
            <span className="italic text-[#D9C7AA]">pacientes</span>
          </motion.h2>
        </div>

        {/* Testimonial Carousel with Fog Effect */}
        <div className="relative">
          {/* Fog/Blur overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FBF9F6] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FBF9F6] to-transparent z-10 pointer-events-none" />

          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-2xl mx-auto text-center">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 md:w-12 md:h-12 text-[#D9C7AA]/30 mx-auto mb-6" />

                  {/* Text */}
                  <p className="text-[#2A2A2A] text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 text-[#D9C7AA]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Author */}
                  <div>
                    <p className="font-serif text-lg text-[#1A3326]">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-[#8B8680] text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1A3326]/10 flex items-center justify-center hover:border-[#D9C7AA] hover:bg-[#D9C7AA]/10 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#1A3326]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-[#D9C7AA] w-6"
                      : "bg-[#1A3326]/20 hover:bg-[#1A3326]/40"
                  }`}
                  aria-label={`Ir a testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1A3326]/10 flex items-center justify-center hover:border-[#D9C7AA] hover:bg-[#D9C7AA]/10 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#1A3326]" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Animación #10: Marquee infinito GSAP ── */}
      <div className="mt-12 md:mt-20 -mx-0">
        <TestimonialsMarquee
          speed={120}
          bgColor="#F0EDE8"
          textColor="#8B8680"
        />
        {/* Marquee de Marcas de Odontología */}
        <TestimonialsMarquee
          items={[
            "★ INVISALIGN",
            "★ STRAUMANN",
            "★ NOBEL BIOCARE",
            "★ 3M ESPE",
            "★ IVOCLAR VIVADENT",
            "★ DENTSPLY SIRONA",
            "★ PHILIPS ZOOM",
          ]}
          speed={100}
          reverse
          bgColor="#E8EDE6"
          textColor="#1A3326"
        />
      </div>
    </section>
  );
}
