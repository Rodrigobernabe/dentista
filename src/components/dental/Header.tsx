"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const navLinks = [
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FBF9F6]/95 backdrop-blur-xl shadow-sm border-b border-[#1A3326]/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#1A3326] flex items-center justify-center group-hover:bg-[#D9C7AA] transition-colors duration-300">
                <span className="font-serif text-[#D9C7AA] group-hover:text-[#1A3326] text-sm md:text-base font-medium transition-colors">
                  VM
                </span>
              </div>
              <div className="hidden sm:block">
                <p
                  className={`font-serif text-base md:text-lg font-light tracking-wide transition-colors ${
                    isScrolled ? "text-[#1A3326]" : "text-white"
                  }`}
                >
                  Villa Mercedes
                </p>
                <p
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                    isScrolled ? "text-[#8B8680]" : "text-white/50"
                  }`}
                >
                  Clínica Dental
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#D9C7AA] ${
                    isScrolled ? "text-[#1A3326]" : "text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+5492657123456"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#D9C7AA] ${
                  isScrolled ? "text-[#1A3326]" : "text-white/80"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">+54 9 2657 12-3456</span>
              </a>
              <MagneticButton
                variant="primary"
                size="sm"
                href="https://wa.me/5492657123456?text=Hola,%20me%20gustaría%20agendar%20una%20consulta"
                className="bg-[#D9C7AA] text-[#1A3326] hover:bg-white"
              >
                Agendar
              </MagneticButton>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? "text-[#1A3326]" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#1A3326]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-6 pt-20"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-white/80 hover:text-[#D9C7AA] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  href="https://wa.me/5492657123456?text=Hola,%20me%20gustaría%20agendar%20una%20consulta"
                  className="bg-[#D9C7AA] text-[#1A3326]"
                >
                  Agendar Cita
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
