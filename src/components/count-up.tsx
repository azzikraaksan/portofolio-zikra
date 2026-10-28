"use client";

import { useEffect, useRef } from "react";

// Angka yang menghitung dari 0 sampai nilai akhir saat masuk layar. Nilai seperti "10+", "100+", atau "3.96"
// dibaca sebagai angka dan akhiran. Tanpa JavaScript atau dengan reduced motion, nilai akhir langsung tampil.
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = el.current;
    const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!node || !m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(m[1]);
    const decimals = m[1].split(".")[1]?.length ?? 0;
    const suffix = m[2];
    const show = (n: number) => { node.textContent = n.toFixed(decimals) + suffix; };
    let raf = 0;

    show(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        show(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else show(target);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(node);

    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  return <b ref={el}>{value}</b>;
}
