"use client";

import { useRef, useState } from "react";

type Ws = "keuangan" | "sdm";

const WORKSPACES: Record<Ws, { label: string; delay: number; tasks: string[] }> = {
  keuangan: {
    label: "Finance",
    delay: 1400,
    tasks: ["Travel reimbursement approval", "Vendor invoice verification", "Quarterly budget recap"],
  },
  sdm: {
    label: "HR",
    delay: 350,
    tasks: ["New hire contract review", "Annual leave approval", "IT staff onboarding"],
  },
};

type LogLine = { id: number; text: string; tone: "plain" | "ok" | "bad" };

// A small imitation of the race condition bug in AlurKerja: the slow Finance response arrives after
// the HR response and overwrites the screen, unless the guard is on.
export function RaceDemo() {
  const [guard, setGuard] = useState(false);
  const [active, setActive] = useState<Ws>("sdm");
  const [shown, setShown] = useState<Ws>("sdm");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);
  const seq = useRef(0);
  const guardRef = useRef(false);
  const activeRef = useRef<Ws>("sdm");
  const lineId = useRef(0);

  const write = (text: string, tone: LogLine["tone"] = "plain") =>
    setLog((l) => [{ id: ++lineId.current, text, tone }, ...l].slice(0, 5));

  const open = (ws: Ws) => {
    const id = ++seq.current;
    activeRef.current = ws;
    setActive(ws);
    setLoading(true);
    write(`Requesting ${WORKSPACES[ws].label} data…`);
    window.setTimeout(() => {
      const stale = id !== seq.current;
      if (stale && guardRef.current) {
        write(`${WORKSPACES[ws].label} response arrived late and was dropped by the guard`, "ok");
        return;
      }
      setShown(ws);
      if (!stale) setLoading(false);
      if (ws !== activeRef.current) write(`${WORKSPACES[ws].label} response arrived late and overwrote the screen`, "bad");
      else write(`${WORKSPACES[ws].label} data shown`);
    }, WORKSPACES[ws].delay);
  };

  const leak = shown !== active && !loading;

  return (
    <div data-ui className="rounded-[20px] p-5 text-[0.9375rem] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2" role="group" aria-label="Choose a workspace">
          {(Object.keys(WORKSPACES) as Ws[]).map((ws) => (
            <button
              key={ws}
              type="button"
              aria-pressed={active === ws}
              onClick={() => open(ws)}
              className="ui-btn min-h-11 rounded-full px-4 font-semibold"
            >
              {WORKSPACES[ws].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={guard}
          onClick={() => {
            guardRef.current = !guard;
            setGuard(!guard);
          }}
          className="flex min-h-11 items-center gap-3 font-semibold"
        >
          <span className="ui-switch relative inline-block h-6 w-11 rounded-full" aria-hidden="true">
            <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white" />
          </span>
          Guard {guard ? "on" : "off"}
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-(--ui-line) p-4" aria-live="polite">
        <p className="font-semibold">
          {WORKSPACES[active].label} workspace
          {loading && <span className="font-normal text-(--ui-muted)"> · loading…</span>}
        </p>
        <ul className="mt-3 space-y-1.5">
          {WORKSPACES[shown].tasks.map((t) => (
            <li key={t} className="flex justify-between gap-3">
              <span>{t}</span>
              <span className="shrink-0 text-(--ui-muted)">{WORKSPACES[shown].label}</span>
            </li>
          ))}
        </ul>
        {leak && (
          <p className="mt-3 font-semibold text-(--ui-bad)">
            {WORKSPACES[shown].label} data is showing in the {WORKSPACES[active].label} workspace.
          </p>
        )}
      </div>

      <ol className="ui-log mt-4 min-h-12 space-y-1 text-(--ui-muted)" aria-label="Request log">
        {log.length === 0 && <li>Click Finance, then HR within a second.</li>}
        {log.map((l) => (
          <li
            key={l.id}
            className={l.tone === "bad" ? "text-(--ui-bad)" : l.tone === "ok" ? "text-(--ui-ok)" : undefined}
          >
            {l.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
