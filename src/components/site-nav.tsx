"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/content/site";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

// Switch theme with a circle growing from the center of the screen (View Transitions API).
// Without that API, or with "reduce motion", the theme switches instantly.
function flipTheme() {
  const root = document.documentElement;
  const now = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = now === "dark" ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = next;
  };
  try {
    localStorage.setItem("theme", next);
  } catch {}

  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }

  const transition = document.startViewTransition(apply);
  const radius = Math.hypot(innerWidth, innerHeight) / 2;
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: ["circle(0px at 50% 50%)", `circle(${radius}px at 50% 50%)`] },
        { duration: 800, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header>
        <nav className="nav" aria-label="Main">
          <Link href="/" className="logo" onClick={() => setOpen(false)}>
            Zikra
          </Link>
          <ul className="nav-links mono">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={profile.cv} download>
                Download CV
              </a>
            </li>
          </ul>
          <div className="nav-end">
            <button type="button" className="icon-btn" aria-label="Switch between light and dark theme" onClick={flipTheme}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </header>
      {open && (
        <div id="menu" className="menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href={profile.cv} download onClick={() => setOpen(false)}>
            Download CV (PDF)
          </a>
        </div>
      )}
    </>
  );
}
