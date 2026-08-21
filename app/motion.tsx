"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionSystem() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    document.documentElement.classList.toggle("reduced-motion", reduced.matches);
    const nav = document.querySelector(".header nav");
    if (nav && !nav.querySelector('[href="#inicio"]')) { const home = document.createElement("a"); home.href = "#inicio"; home.textContent = "Início"; nav.prepend(home); }
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
      el.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
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
    let cursor: HTMLDivElement | null = null;
    const onMove = (event: MouseEvent) => { if (cursor && !reduced.matches) cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; };
    if (finePointer.matches && !reduced.matches) {
      cursor = document.createElement("div"); cursor.className = "custom-cursor"; document.body.appendChild(cursor);
      document.addEventListener("mousemove", onMove);
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => cursor?.classList.add("cursor-active"));
        el.addEventListener("mouseleave", () => cursor?.classList.remove("cursor-active"));
      });
    }
    return () => { observer.disconnect(); triggers.forEach((trigger) => trigger.kill()); lenis?.destroy(); if (lenis) gsap.ticker.remove(tick); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); document.removeEventListener("mousemove", onMove); cursor?.remove(); };
  }, []);
  return null;
}
