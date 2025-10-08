"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";

export default function ScrollProvider() {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number | null = null;
    let gsap: any = null;
    let ScrollTrigger: any = null;

    let resizeHandler = () => {};

    (async () => {
      // Dynamic imports to ensure this runs only on the client
      const [lenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/dist/ScrollTrigger"),
      ]);

      const Lenis = (lenisModule as any).default || (lenisModule as any);
      gsap = (gsapModule as any).default || gsapModule;
      ScrollTrigger = (scrollTriggerModule as any).default || (scrollTriggerModule as any).ScrollTrigger || gsap?.ScrollTrigger;

      if (!gsap || !ScrollTrigger || !Lenis) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      } as any);

      // Update ScrollTrigger on Lenis scroll
      lenis.on("scroll", () => {
        if (ScrollTrigger && ScrollTrigger.update) ScrollTrigger.update();
      });

      // Proxy the native scroll methods to Lenis so ScrollTrigger queries work
      ScrollTrigger.scrollerProxy(window, {
        scrollTop(value: number) {
          if (arguments.length) {
            if (lenis && lenis.scrollTo) lenis.scrollTo(value);
          }
          return lenis?.scroll ?? 0;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // pinType is important for correct pinning behavior
        pinType: document.body.style.transform ? "transform" : "fixed",
      });

      const raf = (time: number) => {
        if (lenis && typeof lenis.raf === "function") lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      // Refresh ScrollTrigger after initialization
      if (ScrollTrigger && ScrollTrigger.refresh) ScrollTrigger.refresh();

      resizeHandler = () => { if (ScrollTrigger && ScrollTrigger.refresh) ScrollTrigger.refresh(); };
      window.addEventListener("resize", resizeHandler);
    })();

    return () => {
      window.removeEventListener("resize", resizeHandler as EventListener);
      if (rafId) cancelAnimationFrame(rafId);
      try {
        if (lenis && typeof lenis.destroy === "function") lenis.destroy();
      } catch (err) {
        // ignore
      }
      try {
        if (ScrollTrigger && typeof ScrollTrigger.kill === "function") ScrollTrigger.kill();
      } catch (err) {
        // ignore
      }
    };
  }, []);

  return null;
}
