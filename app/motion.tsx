"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionSystem() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.documentElement.classList.toggle("reduced-motion", reduced.matches);
    document.documentElement.classList.add("has-motion");
    const nav = document.querySelector(".header nav");
    const header = document.querySelector<HTMLElement>(".header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > Math.max(40, (hero?.offsetHeight ?? 700) * 0.12));
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    const routeFormClicks = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a");
      if (link?.href.includes("docs.google.com/forms/d/e/1FAIpQLSdUgwMVjn7P-t4hZxPQ8pxbdKvaJLssmjazlcooW8n8mWnLXQ")) {
        event.preventDefault();
        window.location.href = "/pre-matricula";
      }
    };
    document.addEventListener("click", routeFormClicks);
    if (nav) nav.setAttribute("aria-label", "Navegação principal");
    gsap.registerPlugin(ScrollTrigger);
    const lenis = reduced.matches ? null : new Lenis({ duration: 1.1, smoothWheel: true });
    const tick = (time: number) => { lenis?.raf(time * 1000); };
    if (lenis) gsap.ticker.add(tick);
    const triggers: ScrollTrigger[] = [];
    const reveal = Array.from(document.querySelectorAll<HTMLElement>(
      ".section > *, .course-card, .timeline > div, .orchestra-visual, .closing > *"
    ));
    reveal.forEach((el, index) => {
      el.dataset.reveal = "true";
      el.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 20}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    reveal.forEach((el) => observer.observe(el));
    if (!reduced.matches) {
      document.querySelectorAll<HTMLElement>(".hero h1, .hero-text, .hero-actions, .hero-art, .manifesto h2, .history h2").forEach((el) => {
        triggers.push(ScrollTrigger.create({ trigger: el, start: "top 88%", end: "bottom 18%", scrub: 0.6, onUpdate: (self) => {
          const amount = (self.progress - 0.5) * -12;
          gsap.set(el, { y: amount });
        } }));
      });
    }
    let frame = 0;
    const onScroll = () => {
      if (reduced.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.transform = `translate3d(0, ${(window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.035}px, 0)`;
      }));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); triggers.forEach((trigger) => trigger.kill()); lenis?.destroy(); if (lenis) gsap.ticker.remove(tick); document.removeEventListener("click", routeFormClicks); window.removeEventListener("scroll", onScroll); window.removeEventListener("scroll", updateHeader); cancelAnimationFrame(frame); document.documentElement.classList.remove("has-motion"); };
  }, []);
  return null;
}
