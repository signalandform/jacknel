import Link from "next/link";

export default function Home() {
  const projects = [
    {
      title: "Project One",
      description: "A brief description of your project—design, tech stack, and outcome.",
      tags: ["Design", "React", "Figma"],
      href: "#",
    },
    {
      title: "Project Two",
      description: "Another project showcasing your range. Could be branding, web app, or product.",
      tags: ["Branding", "Next.js", "Motion"],
      href: "#",
    },
    {
      title: "Project Three",
      description: "Your third featured work. Replace with real projects and links.",
      tags: ["UI/UX", "TypeScript", "Tailwind"],
      href: "#",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-semibold text-lg tracking-tight">
            Your Name
          </Link>
          <div className="flex gap-8 text-sm text-muted hover:[&>a]:text-ink transition-colors">
            <Link href="#work">Work</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
            Designer & Developer
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            I craft digital experiences that look good and work well.
          </h1>
          <p className="text-xl text-muted max-w-2xl leading-relaxed">
            Blending design sensibility with clean code. I build interfaces, brands,
            and products that feel intentional.
          </p>
          <div className="mt-12 flex gap-4">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-medium rounded-full hover:bg-ink/90 transition-colors"
            >
              View work
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink/20 font-medium rounded-full hover:border-ink/40 hover:bg-ink/5 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-24 px-6 border-t border-ink/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-mono text-muted uppercase tracking-widest mb-12">
            Selected work
          </h2>
          <div className="space-y-16">
            {projects.map((project, i) => (
              <article key={i} className="group">
                <Link href={project.href} className="block">
                  <div className="aspect-video bg-ink/5 rounded-2xl mb-6 group-hover:bg-ink/10 transition-colors" />
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 bg-ink/5 rounded text-muted"
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
      <section id="about" className="py-24 px-6 border-t border-ink/5 bg-ink text-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-mono text-cream/60 uppercase tracking-widest mb-12">
            About
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xl leading-relaxed text-cream/90 mb-6">
                I&apos;m a designer and developer based in [Your City]. I care about
                thoughtful interfaces, clear typography, and systems that scale.
              </p>
              <p className="text-cream/70 leading-relaxed">
                When I&apos;m not pushing pixels or writing code, you might find me
                [hobby or interest]. I&apos;m always open to interesting projects
                and collaborations.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm text-cream/60 uppercase tracking-widest mb-4">
                Skills & tools
              </h3>
              <ul className="space-y-2 text-cream/90">
                <li>UI/UX Design · Figma, Sketch</li>
                <li>Frontend · React, Next.js, TypeScript</li>
                <li>Styling · Tailwind, CSS</li>
                <li>Motion · Framer Motion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 border-t border-ink/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-mono text-muted uppercase tracking-widest mb-6">
            Let&apos;s work together
          </h2>
          <p className="text-2xl md:text-3xl font-semibold mb-8">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="mailto:hello@example.com"
              className="text-accent font-medium hover:underline underline-offset-4"
            >
              hello@example.com
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-ink/5">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-muted">
          <span>© {new Date().getFullYear()} Your Name</span>
          <span>Built with Next.js · Deployed on Vercel</span>
        </div>
      </footer>
    </main>
  );
}
