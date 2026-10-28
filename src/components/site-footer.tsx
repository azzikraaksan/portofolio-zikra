import Link from "next/link";
import { profile } from "@/content/site";

const icon = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export function SiteFooter() {
  return (
    <footer className="wrap pt-10 pb-12">
      <div className="flex flex-col gap-8 border-t border-(--hairline) pt-10 md:flex-row md:items-center md:justify-between">
        <p className="muted max-w-[28ch]">© 2026 {profile.name}</p>
        <div className="social">
          <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email">
            <svg {...icon}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          </a>
          <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg {...icon}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v5M8 8v.01M12 16v-5M12 13a2.5 2.5 0 0 1 5 0v3" /></svg>
          </a>
          <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg {...icon}><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.5 2.1 5.5 2.4 5.5 2.4a4.3 4.3 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.8 5.7 5.5 6A2.8 2.8 0 0 0 8.8 17.8V21" /></svg>
          </a>
        </div>
        <ul className="foot-links">
          <li><Link className="link" href="/#projects">Projects</Link></li>
          <li><Link className="link" href="/#about">About</Link></li>
          <li><Link className="link" href="/#journey">Journey</Link></li>
          <li><Link className="link" href="/#skills">Skills</Link></li>
          <li><a className="link" href={profile.cv} download>Download CV</a></li>
        </ul>
      </div>
    </footer>
  );
}
