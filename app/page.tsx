import Link from "next/link";

export default function Home() {
  const projects = [
    {
      title: "Project One",
      description:
        "A brief description of your project—design, tech stack, and outcome.",
      tags: ["Design", "React", "Figma"],
      href: "#",
    },
    {
      title: "Project Two",
      description:
        "Another project showcasing your range. Could be branding, web app, or product.",
      tags: ["Branding", "Next.js", "Motion"],
      href: "#",
    },
    {
      title: "Project Three",
      description:
        "Your third featured work. Replace with real projects and links.",
      tags: ["UI/UX", "TypeScript", "Tailwind"],
      href: "#",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="px-6 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-5xl">
          <p className="animate-hero-fade-up font-mono text-sm uppercase tracking-widest text-contrast/60">
            Designer · Engineer · Operator
          </p>
          <h1 className="mt-5 max-w-4xl animate-hero-fade-up text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            I build clean, human software—and the brands around it.
          </h1>
          <p className="mt-6 max-w-2xl animate-hero-fade-up text-lg leading-relaxed text-contrast/70">
            Product design, UI engineering, and a bias for shipping. This site is a
            living snapshot of what I&apos;m making.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-contrast px-6 py-3 text-sm font-medium text-base hover:bg-contrast/90"
            >
              View work
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-contrast/90 hover:bg-white/5"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
              Selected work
            </h2>
            <span className="text-sm text-contrast/50">
              (Replace placeholders with real case studies)
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-3xl border border-white/10 bg-card p-6 transition hover:border-white/20 hover:bg-white/10"
              >
                <Link href={project.href} className="block">
                  <div className="aspect-video rounded-2xl bg-white/5" />
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    <span className="group-hover:text-[color:var(--accent)]">
                      {project.title}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-contrast/65">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-contrast/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
              About
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-contrast/75">
              I&apos;m Jack. I care about typography, systems, and interfaces that
              feel inevitable.
            </p>
            <p className="mt-4 leading-relaxed text-contrast/65">
              If something needs to be designed and built (and actually shipped),
              I&apos;m interested.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <h3 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
              Skills & tools
            </h3>
            <ul className="mt-5 space-y-2 text-contrast/75">
              <li>Design systems · Figma</li>
              <li>Frontend · Next.js, React, TypeScript</li>
              <li>Backend · Node, Postgres</li>
              <li>Ops · Vercel, Docker</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-card p-10 text-center">
          <h2 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
            Contact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold tracking-tight">
            Want to build something together?
          </p>
          <p className="mt-3 text-contrast/65">
            Email is best. Links below are placeholders—swap in your real profiles.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link
              href="mailto:jack@signalandformllc.com"
              className="font-medium text-[color:var(--accent)] hover:underline underline-offset-4"
            >
              jack@signalandformllc.com
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-contrast/60 hover:text-contrast"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-contrast/60 hover:text-contrast"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
