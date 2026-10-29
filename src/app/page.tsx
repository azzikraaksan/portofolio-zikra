import Link from "next/link";
import { CountUp } from "@/components/count-up";
import { Carousel } from "@/components/carousel";
import { Laptop } from "@/components/laptop";
import { RaceDemo } from "@/components/race-demo";
import { Shot } from "@/components/shot";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { alurkerjaHighlights, avatar, building, heroPhotos, laptopScreens, path, profile, projects, skillGroups, stats } from "@/content/site";
import Image from "next/image";

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;
const fill = { aspectRatio: "auto" } as const;

const Arrow = ({ d = "M5 12h14M13 6l6 6-6 6" }: { d?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const [featured, ...others] = projects;

const letter = [
  "My full name is Azzikra Ramadhanti Aksan. I'm a full stack developer with 1+ year of experience.",
  "Since August 2025 I've been at PT Javan Cipta Solusi, first as an intern, then as a freelancer. Most of my time goes into AlurKerja: building features from the API to interface, and handling 100+ support tickets.",
  "Two years of handling letters, meeting minutes, and records for BEM made me careful by habit. That habit carries into my code: validation, access limits, and quality gates.",
];

const fanPhotos = [
  { src: "/images/profile/fan-01.jpeg", alt: "Zikra portrait 1", rotate: -32 },
  { src: "/images/profile/fan-02.jpeg", alt: "Zikra portrait 2", rotate: -16 },
  { src: "/images/profile/fan-03.jpeg", alt: "Zikra portrait 3", rotate: 0 },
  { src: "/images/profile/fan-04.jpeg", alt: "Zikra portrait 4", rotate: 16 },
  { src: "/images/profile/fan-05.jpeg", alt: "Zikra portrait 5", rotate: 32 },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        {/* Hero: teks, foto berbentuk lengkung, daftar yang sedang dikerjakan */}
        <section className="hero wrap">
          <div className="hero-grid">
            <div className="pt-28 lg:pt-0">
              <p data-load style={vars({ "--d": "0ms" })} className="badge mono">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
                Full Stack Development × Web Applications
              </p>
              <h1 className="hero-title lines mt-6">
                <span className="line"><span data-line style={vars({ "--i": 0 })}>I Ship</span></span>
                <span className="line"><em data-line style={vars({ "--i": 1 })}>thoughtful code,</em></span>
                <span className="line"><span data-line style={vars({ "--i": 2 })}>Real Impact.</span></span>
              </h1>
              <p data-load style={vars({ "--d": "420ms" })} className="lead mt-7 max-w-[34ch]">
                From APIs to pixels, backend to frontend. I like making things work, making them better, and figuring out the tricky bits along the way.
              </p>
              <div data-load style={vars({ "--d": "500ms" })} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
                <a className="btn" href="#contact">Let's Build Together<span className="go"><Arrow /></span></a>
                <a className="textlink mono" href={profile.cv} download>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
                  <span className="u">Download CV</span>
                </a>
              </div>
              <p data-load style={vars({ "--d": "560ms" })} className="mono mt-7">
                <Link className="textlink muted" href="/#projects"><span className="u">Or browse my projects</span> <Arrow d="M5 12h14M13 6l6 6-6 6" /></Link>
              </p>
            </div>

            <figure data-open className="arch lg:-mt-0" aria-label="Photo of Zikra">
              <div className="stack drift">
                {heroPhotos.map((p, i) => (
                  <Shot key={p.src} {...p} width={920} height={1380} sizes="(min-width: 1024px) 480px, 82vw" priority={i === 0} className="h-full w-full" style={{ ...fill, ...vars({ "--i": i }) }} />
                ))}
              </div>
            </figure>

            <div data-load style={vars({ "--d": "600ms" })} className="lg:pt-16">
              <p className="mono muted mb-5 lg:text-right">~ What I&apos;ve Been Building ~</p>
              <ul className="now">
                {building.map((b) => (
                  <li key={b.name}>
                    <Link href={b.href}>
                      <span className="name">{b.name}</span>
                      <span className={`dot ${b.dot === "wait" ? "wait" : ""}`} aria-hidden="true" />
                      <span className="mono muted">{b.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Bukti kerja */}
        <section id="projects" aria-labelledby="sk" className="wrap section">
          <p data-reveal suppressHydrationWarning className="mono eyebrow">~ Proof of work</p>
          <h2 id="sk" data-reveal suppressHydrationWarning style={vars({ "--i": 1 })} className="title">
            Things I&apos;ve <em>built.</em>
          </h2>
          <div className="showcase mt-10">
            <div data-reveal suppressHydrationWarning className="showcase-text">
              <p className="mono muted"><span className="dot" aria-hidden="true" /> Featured Project</p>
              <h3 className="feature-title">{featured.name}</h3>
              <p className="feature-lead">{featured.title}.</p>
              <ul className="highlights">
                {alurkerjaHighlights.map((h) => (
                  <li key={h.name}>
                    <b>{h.name}</b>
                    <span>{h.text}</span>
                  </li>
                ))}
              </ul>
              <ul className="chips">
                {featured.stack.slice(0, 3).map((s) => <li key={s}>{s}</li>)}
              </ul>
              <Link className="btn" href={`/projects/${featured.slug}`}>Explore more <span className="go"><Arrow /></span></Link>
            </div>
            <div data-reveal suppressHydrationWarning style={vars({ "--i": 2 })}>
              <Laptop labels={laptopScreens.map((s) => s.alt)}>
                {laptopScreens.map((s) => (
                  <Shot key={s.src} {...s} width={1600} height={1000} sizes="(min-width: 1024px) 560px, 90vw" priority className="h-full w-full" style={fill} />
                ))}
              </Laptop>
              <p className="mono muted mt-1 text-center">Tap a dot to switch screens</p>
            </div>
          </div>

          <p className="mono eyebrow mt-20">~ Selected projects</p>
          <div>
            <Carousel label="Selected projects">
              {others.map((c, i) => (
                <li key={c.slug} className="card">
                  <Link href={`/projects/${c.slug}`} className="entry">
                    <div className="pic">
                      <Shot {...c.image} alt="" width={1600} height={1000} sizes="420px" className="h-full w-full" style={fill} />
                    </div>
                    <div className="body">
                      <span className="mono muted">Entry {String(i + 1).padStart(2, "0")} · {c.kind}</span>
                      <h3>
                        {c.name}
                        <Arrow d="M7 17L17 7M8 7h9v9" />
                      </h3>
                      <p>{c.title}.</p>
                    </div>
                  </Link>
                </li>
              ))}
            </Carousel>
          </div>

          <dl data-reveal suppressHydrationWarning className="statbar mt-14">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} />
                  <span className="mono muted mt-3 block">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Tentang */}
        <section id="about" aria-labelledby="tt" className="wrap section">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <figure data-reveal suppressHydrationWarning className="about-pic max-w-140">
              <Shot {...avatar} width={1000} height={1250} sizes="(min-width: 1024px) 40vw, 90vw" className="h-full w-full" style={fill} />
            </figure>
            <div>
              <p data-reveal suppressHydrationWarning className="mono eyebrow">01 ~ Who I am</p>
              <h2 id="tt" data-reveal suppressHydrationWarning style={vars({ "--i": 1 })} className="title">Hi, <em>I&apos;m</em> Zikra</h2>
              <div className="muted mt-8 max-w-[56ch] space-y-5 text-lg">
                {letter.map((p, i) => <p key={i} data-reveal suppressHydrationWarning style={vars({ "--i": i + 2 })}>{p}</p>)}
              </div>
              <p data-reveal suppressHydrationWarning className="mono mt-9">
                <a className="textlink" href={profile.cv} download><span className="u">Download the full CV</span> <Arrow /></a>
              </p>
            </div>
          </div>
        </section>


        {/* Personal photo fan */}
        <section aria-labelledby="cb" className="dark section">
          <div className="wrap grid items-center gap-2 lg:grid-cols-[3fr_4fr] lg:gap-12">
            <div>
              <p
                data-reveal
                suppressHydrationWarning
                className="badge mono"
              >
                A LITTLE ABOUT ME
              </p>

              <h2
                id="cb"
                data-reveal
                suppressHydrationWarning
                style={vars({ "--i": 1 })}
                className="title mt-6"
              >
                More than <em>just code.</em>
              </h2>

              <p
                data-reveal
                suppressHydrationWarning
                style={vars({ "--i": 2 })}
                className="muted mt-6 max-w-[44ch]"
              >
                A developer who enjoys solving problems, exploring ideas,
                and turning thoughtful details into meaningful digital
                experiences.
              </p>
            </div>

            <div
              data-reveal
              suppressHydrationWarning
              style={vars({ "--i": 2 })}
              className="photo-fan-wrap"
            >
              <div className="photo-fan" aria-label="A collection of my photos">
                {fanPhotos.map((photo, i) => (
                  <div
                    key={photo.src}
                    className={`photo-fan-card ${
                      i === 2 ? "photo-fan-card-center" : ""
                    }`}
                    style={vars({
                      "--rotate": `${photo.rotate}deg`,
                      "--index": i,
                      "--layer": i === 2 ? 6 : 5 - Math.abs(i - 2),
                    })}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 190px, 28vw"
                      className="photo-fan-image"
                    />
                    <span className="photo-fan-number mono">
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Jalur */}
        <section id="journey" aria-labelledby="pj" className="wrap section pt-0">
          <p data-reveal suppressHydrationWarning className="mono eyebrow">~ Journey</p>
          <h2 id="pj" data-reveal suppressHydrationWarning style={vars({ "--i": 1 })} className="title">
            Started in the Classroom <em>still climbing.</em>
          </h2>
          <ol className="timeline mt-14">
            {path.map((s, i) => (
              <li key={`${s.title}-${s.when}`} data-reveal="item" suppressHydrationWarning style={vars({ "--i": i })} className="stop">
                <span className="mono muted">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
            <li data-reveal="item" suppressHydrationWarning style={vars({ "--i": 4 })} className="stop stop-end">
              <span className="mono">Now · open</span>
              <h3>Full stack developer</h3>
              <p>From backend to frontend. Let's build with me.</p>
            </li>
          </ol>
        </section>

        {/* Keahlian dan teknologi */}
        <section id="skills" aria-labelledby="ka" className="wrap section pt-0">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p data-reveal suppressHydrationWarning className="mono eyebrow">~ Skills &amp; technologies</p>
              <h2 id="ka" data-reveal suppressHydrationWarning style={vars({ "--i": 1 })} className="title">What I <em>work with.</em></h2>
            </div>
          </div>
          <div className="layers mt-10">
            {skillGroups.map((g, i) => (
              <article key={g.key} data-reveal="item" suppressHydrationWarning style={vars({ "--i": i })} className={`layer ${g.tone}`}>
                <span className="mono opacity-70">{String(g.items.length).padStart(2, "0")} skills</span>
                <h3>{g.title}</h3>
                <p className="tag">{g.tagline}</p>
                <ul className="chips mt-8">
                  {g.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Kontak */}
        <section id="contact" aria-labelledby="kt" className="wrap section">
          <p data-reveal suppressHydrationWarning className="mono eyebrow">06 ~ Start here</p>
          <h2 id="kt" data-reveal suppressHydrationWarning style={vars({ "--i": 1 })} className="title">Contact <em>me.</em></h2>
          <p data-reveal suppressHydrationWarning style={vars({ "--i": 2 })} className="muted mt-7 max-w-[52ch] text-lg">
            I&apos;m open to full stack developer roles, from backend to frontend. Tell me about the role and I&apos;ll reply by email.
          </p>
          <div data-reveal suppressHydrationWarning style={vars({ "--i": 3 })} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a className="btn" href={`mailto:${profile.email}?subject=${encodeURIComponent("Hello Zikra, from your portfolio")}`}>
              Send an email <span className="go"><Arrow d="M7 17L17 7M8 7h9v9" /></span>
            </a>
            <span className="muted">Or write directly to <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a></span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
