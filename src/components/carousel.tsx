"use client";

import { useRef } from "react";

// Baris kartu yang bisa digeser dengan sentuhan, panah keyboard, atau dua tombol.
export function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const rail = useRef<HTMLUListElement>(null);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 400) + 20;
    el.scrollBy({ left: dir * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={d === -1 ? "Scroll left" : "Scroll right"}
            className="icon-btn border border-(--hairline)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={d === -1 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        ))}
      </div>
      <ul ref={rail} className="rail" aria-label={label} tabIndex={0}>
        {children}
      </ul>
    </div>
  );
}
