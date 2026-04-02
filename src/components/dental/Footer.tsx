"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { ToothSVG } from "./ToothSVG";

export function Footer() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Dirección",
      value: "Av. Mitre 1234, Villa Mercedes, San Luis",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+54 9 2657 12-3456",
      href: "tel:+5492657123456",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contacto@clinicavillamercedes.com",
      href: "mailto:contacto@clinicavillamercedes.com",
    },
    {
      icon: Clock,
      label: "Horario",
      value: "Lun - Vie: 9:00 - 20:00 | Sáb: 9:00 - 14:00",
    },
  ];

  return (
    <footer id="contacto" className="bg-[#1A3326]">
      {/* Sección de contacto */}
      <div className="py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">

            {/* ── Animación #8: SVG diente dibujándose ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <ToothSVG size={80} strokeColor="#D9C7AA" />
            </motion.div>

            {/* Encabezado */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#D9C7AA] text-xs uppercase tracking-[0.3em] mb-4">
                Contacto
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6">
                Agenda tu{" "}
                <span className="italic text-[#D9C7AA]">consulta</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg mb-12 leading-relaxed">
                Estamos aquí para ayudarte. Contáctanos y uno de nuestros
                especialistas te asesorará sobre el mejor tratamiento para ti.
              </p>
            </motion.div>

            {/* Grid de datos de contacto */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-5 md:p-6 border border-white/5 hover:border-[#D9C7AA]/20 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D9C7AA]/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#D9C7AA]" />
                    </div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">
                      {item.label}
                    </p>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-[#D9C7AA] transition-colors text-sm md:text-base"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm md:text-base">
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Botones CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
            >
              <MagneticButton
                variant="primary"
                size="lg"
                href="https://wa.me/5492657123456?text=Hola,%20me%20gustaría%20agendar%20una%20consulta"
                className="bg-[#D9C7AA] text-[#1A3326] hover:bg-white"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                href="tel:+5492657123456"
                className="text-white border-white/30 hover:border-[#D9C7AA]"
              >
                Llamar Ahora
              </MagneticButton>
            </motion.div>

            {/* Redes sociales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center gap-3"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D9C7AA] hover:bg-[#D9C7AA]/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D9C7AA] hover:bg-[#D9C7AA]/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D9C7AA] flex items-center justify-center">
                <span className="font-serif text-[#1A3326] text-xs font-medium">
                  VM
                </span>
              </div>
              <span className="text-white/30 text-xs">
                © 2025 Clínica Dental Villa Mercedes
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
