"use client";

import { useEffect, useState } from "react";

const TEXT = "building the portfolio…";
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

// Layar pembuka sekali per sesi. Posisi, gerak, dan waktu hilangnya dikendalikan di sini lewat gaya
// inline dan timer, jadi tetap menutup lalu lenyap sendiri meskipun stylesheet terlambat atau basi.
export function Intro() {
  const [show, setShow] = useState(true);
  const [go, setGo] = useState(false);
  const [typed, setTyped] = useState(0);
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    if (!root.classList.contains("has-intro")) {
      at(0, () => setShow(false));
      return () => timers.forEach(clearTimeout);
    }

    root.style.overflow = "hidden";
    let ticker = 0;
    at(30, () => {
      setTyped(0);
      setLeave(false);
      setGo(true);
    });
    at(650, () => {
      let n = 0;
      ticker = window.setInterval(() => {
        n += 1;
        setTyped(n);
        if (n >= TEXT.length) window.clearInterval(ticker);
      }, 48);
    });
    at(2100, () => setLeave(true));
    at(2850, () => {
      root.style.overflow = "";
      setShow(false);
    });

    return () => {
      timers.forEach(clearTimeout);
      window.clearInterval(ticker);
      root.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <>
      <noscript>
        <style>{".intro{display:none!important}"}</style>
      </noscript>
      <div
        className="intro"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          display: "grid",
          placeItems: "center",
          background: "var(--ground, #f9f5f2)",
          color: "var(--muted, #6c6360)",
          transform: leave ? "translateY(-100%)" : "none",
          transition: `transform 700ms ${EASE}`,
        }}
      >
        <div style={{ display: "grid", justifyItems: "center", gap: "1.1rem", padding: "0 20px" }}>
          <span
            className="logo"
            style={{
              fontSize: "clamp(3.4rem, 10vw, 5.5rem)",
              opacity: go ? 1 : 0,
              transition: "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Zikra
          </span>

          <div style={{ position: "relative", width: 200, height: 28 }}>
            <svg
              width="200"
              height="28"
              viewBox="0 0 200 28"
              fill="none"
              style={{
                display: "block",
                clipPath: go ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                transition: `clip-path 900ms ${EASE} 350ms`,
              }}
            >
              <path d="M2 20 C 40 20, 60 6, 100 12 S 160 22, 198 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 7" />
            </svg>
            <span
              style={{
                position: "absolute",
                left: -16,
                top: 0,
                width: 32,
                textAlign: "center",
                fontWeight: 700,
                color: "var(--accent-ink, #a65a52)",
                opacity: go ? 1 : 0,
                transform: go ? "translate(198px, -12px)" : "translate(0, 6px)",
                transition: `transform 900ms ${EASE} 350ms, opacity 250ms ease 350ms`,
              }}
            >
              {"</>"}
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.55rem",
              lineHeight: 1.2,
              color: "var(--ink, #3a3636)",
              minWidth: "11.5em",
              minHeight: "1.3em",
              textAlign: "left",
              marginTop: "0.4rem",
            }}
          >
            {TEXT.slice(0, typed)}
            <span className="caret" />
          </p>
        </div>
      </div>
    </>
  );
}
