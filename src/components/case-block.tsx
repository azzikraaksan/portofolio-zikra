"use client";

import { useEffect, useRef } from "react";

// Satu fitur yang bisa dibuka dan ditutup. Tautan #id dari daftar kasus membuka bagian yang dituju.
export function CaseBlock({
  id,
  defaultOpen,
  label,
  name,
  title,
  children,
}: {
  id: string;
  defaultOpen: boolean;
  label: string;
  name: string;
  title: string;
  children: React.ReactNode;
}) {
  const el = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (location.hash.slice(1) !== id || !el.current) return;
      el.current.open = true;
      el.current.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    openFromHash();
    addEventListener("hashchange", openFromHash);
    return () => removeEventListener("hashchange", openFromHash);
  }, [id]);

  return (
    <details ref={el} id={id} className="case-block" open={defaultOpen}>
      <summary>
        <span className="head">
          <span className="mono muted">{label}</span>
          <span className="name">{name}</span>
          <span className="sub">{title}</span>
        </span>
        <span className="tog" aria-hidden="true" />
      </summary>
      <div className="case-body">{children}</div>
    </details>
  );
}
