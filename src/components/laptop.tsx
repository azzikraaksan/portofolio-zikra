"use client";

import { Children, useState } from "react";

// Mockup laptop dengan layar yang bisa diganti. Gambar dirender di server dan dikirim sebagai children.
export function Laptop({ children, labels }: { children: React.ReactNode; labels: string[] }) {
  const [i, setI] = useState(0);
  const screens = Children.toArray(children);

  return (
    <div className="laptop">
      <div className="lid">
        <div className="screen">
          {screens.map((s, k) => (
            <div key={k} className={k === i ? "is-on" : undefined} aria-hidden={k !== i}>
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="base" aria-hidden="true" />
      <div className="dots" role="group" aria-label="Choose a screen">
        {labels.map((l, k) => (
          <button key={l} type="button" aria-label={l} aria-pressed={k === i} onClick={() => setI(k)}>
            <i />
          </button>
        ))}
      </div>
    </div>
  );
}
