import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseBlock } from "@/components/case-block";
import { Devices } from "@/components/devices";
import { Shot } from "@/components/shot";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { projects } from "@/content/site";

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;
const fill = { aspectRatio: "auto" } as const;

const Chevron = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: `${p.title}. ${p.summary}` };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];

  return (
    <>
      <SiteNav />
      <main id="main" className="wrap pt-32 pb-8 lg:pt-40">
        <p data-load style={vars({ "--d": "0ms" })} className="mono eyebrow">
          <Link className="link" href="/#projects">← All projects</Link> · {p.kind}
        </p>
        <h1 className="title lines">
          <span className="line"><span data-line style={vars({ "--i": 0 })}>{p.name}</span></span>
        </h1>
        <p data-load style={vars({ "--d": "300ms" })} className="lead mt-6 max-w-[40ch]">{p.title}</p>

        <div data-open className="mt-10">
          <Devices slug={p.slug} name={p.name} />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <article className="prose">
            <p className="text-lg">{p.summary}</p>

            {p.cases && (
              <nav aria-label="Cases in this project" className="mt-10">
                <p className="mono muted">Cases in this project</p>
                <ul className="case-index">
                  {p.cases.map((c) => (
                    <li key={c.slug}>
                      <a className="link" href={`#${c.slug}`}>{c.name}</a>
                      <span className="muted"> · {c.title}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {p.problem && (
              <>
                <h2 data-reveal suppressHydrationWarning>The problem</h2>
                <p data-reveal suppressHydrationWarning>{p.problem}</p>
              </>
            )}

            <h2 data-reveal suppressHydrationWarning>What I <em>did</em></h2>
            <ul>
              {p.solution.map((s, k) => (
                <li key={s} data-reveal="item" suppressHydrationWarning style={vars({ "--i": k })}>{s}</li>
              ))}
            </ul>

            {p.decision && (
              <>
                <h2 data-reveal suppressHydrationWarning>Technical <em>decision</em></h2>
                <p data-reveal suppressHydrationWarning>{p.decision}</p>
              </>
            )}

            {p.result && (
              <>
                <h2 data-reveal suppressHydrationWarning>The result</h2>
                <p data-reveal suppressHydrationWarning className="text-xl font-bold leading-snug">{p.result}</p>
              </>
            )}

            {p.cases && (
              <h2 data-reveal suppressHydrationWarning>Features I <em>developed</em></h2>
            )}
            {p.cases?.map((c, k) => (
              <CaseBlock
                key={c.slug}
                id={c.slug}
                defaultOpen={k === 0}
                label={`Feature ${String(k + 1).padStart(2, "0")} · ${c.kind} · ${c.repo}`}
                name={c.name}
                title={c.title}
              >
                <figure className="mt-2 overflow-clip rounded-3xl bg-(--beige)">
                  <Shot {...c.image} width={1600} height={1000} sizes="(min-width: 1024px) 60vw, 92vw" className="h-auto w-full" />
                </figure>
                <p className="mono muted mt-3">{c.image.alt}</p>
                <p className="mt-6">{c.summary}</p>

                <h3>The problem</h3>
                <p>{c.problem}</p>

                <h3>What I did</h3>
                <ul>
                  {c.solution.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <h3>Technical decision</h3>
                <p>{c.decision}</p>

                <h3>The result</h3>
                <p className="font-bold">{c.result}</p>

                <p className="mono muted mt-6">{c.stack.join(" · ")}</p>
              </CaseBlock>
            ))}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-7">
              <p className="mono muted">Summary</p>
              <dl className="facts mt-5">
                <dt className="muted">Type</dt><dd>{p.kind}</dd>
                {p.repo && (<><dt className="muted">Repo</dt><dd>{p.repo}</dd></>)}
                {p.stack.length > 0 && (<><dt className="muted">Stack</dt><dd>{p.stack.join(", ")}</dd></>)}
                {p.cases && (<><dt className="muted">Cases</dt><dd>{p.cases.length}</dd></>)}
              </dl>
              <Link className="btn is-small mt-8" href="/#contact">
                Write to me
                <span className="go">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            </div>
          </aside>
        </div>

        <nav aria-label="Other projects" className="section pb-0">
          <ul className="pager">
            {([[prev, "Previous project", "prev"], [next, "Next project", "next"]] as const).map(([q, label, dir]) => (
              <li key={dir}>
                <Link href={`/projects/${q.slug}`} className={`card pager-link ${dir}`} aria-label={`${label}: ${q.name}`}>
                  <span className="pager-name">
                    {dir === "prev" && <Chevron d="M15 5l-7 7 7 7" />}
                    {q.name}
                    {dir === "next" && <Chevron d="M9 5l7 7-7 7" />}
                  </span>
                  <span className="pager-text">{q.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
