"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Lapisan gerak untuk halaman yang dirender server. Semua state tersembunyi ada di CSS di bawah
// `html.js`, jadi tanpa skrip ini isi halaman tetap tampil utuh.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Masuk saat di-scroll, sekali
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Indeks studi kasus: baris yang ditunjuk atau difokus menukar gambar di bingkai
    document.querySelectorAll<HTMLElement>("[data-index]").forEach((root) => {
      const rows = [...root.querySelectorAll<HTMLElement>("[data-row]")];
      const frames = [...root.querySelectorAll<HTMLElement>("[data-frame] > *")];
      const show = (i: number) => {
        rows.forEach((r, k) => r.classList.toggle("is-active", k === i));
        frames.forEach((f, k) => f.classList.toggle("is-on", k === i));
      };
      rows.forEach((row, i) => {
        const on = () => show(i);
        row.addEventListener("pointerenter", on);
        row.addEventListener("focus", on);
        cleanups.push(() => {
          row.removeEventListener("pointerenter", on);
          row.removeEventListener("focus", on);
        });
      });
    });

    // Foto yang berganti berhenti saat tab tidak terlihat
    const onVisibility = () => document.documentElement.classList.toggle("is-hidden", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
