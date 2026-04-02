import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins de GSAP globalmente
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook que crea un contexto GSAP con cleanup automático.
 * Uso: const ctx = useGsapContext(containerRef, () => { ... animaciones ... });
 */
export function useGsapContext(
  scope: React.RefObject<Element | null>,
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Crear contexto GSAP con scope para selector seguro
    const ctx = gsap.context((self) => {
      callback(self);
    }, scope);

    ctxRef.current = ctx;

    // Cleanup: revertir todas las animaciones al desmontar
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
}
