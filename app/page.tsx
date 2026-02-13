import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const portfolioItems = [
    {
      id: "signalandform",
      title: "Signal & Form",
      description:
        "Signal & Form is my design studio where I deliver digital, brand, and visual design work for clients. Through this work, I collaborate directly with stakeholders, manage feedback cycles, and deliver polished design assets ready for implementation.",
      metaLabel: "Clients:",
      meta:
        "Baja Quesadilla, T-Mac’s Cajun Pot, 90’s BBQ, Roanoke Food Pantry, Smashed Villa, Street Spice, NTAC",
      links: [
        { label: "signalandformllc.com", href: "https://signalandformllc.com" },
      ],
    },
    {
      id: "typestrip",
      title: "TypeStrip",
      subtitle: "Privacy-First iOS OCR App",
      sections: [
        {
          heading: "Overview",
          body: "TypeStrip is a privacy-first iOS app designed to quickly extract text from images using on-device OCR. The goal was to create a fast, minimal experience that lets users capture, review, and export text without unnecessary friction or cloud dependency.",
        },
        {
          heading: "Problem",
          body: "Many OCR tools prioritize feature depth over speed and clarity, creating bloated workflows for a task that users want to complete in seconds. I wanted to design an experience that felt lightweight, intentional, and respectful of user privacy.",
        },
        {
          heading: "My Role",
          body: "I led the product from concept through execution, defining the UX flows, visual design, and interaction patterns. I designed the full interface and shipped the product with a focus on simplicity and usability.",
        },
        {
          heading: "Design Process",
          body: "I focused on reducing the experience to its essential steps: capture, review, and export. Early wireframes explored different navigation models before settling on a single, linear flow that minimized cognitive load. Visual design emphasized readability, spacing, and contrast, aligning with modern iOS patterns while avoiding unnecessary decoration.",
        },
        {
          heading: "Solution",
          body: "The final product consists of 5–6 core screens designed to support fast capture and review. Interactions are intentional and predictable, allowing users to complete tasks quickly without learning overhead.",
        },
        {
          heading: "Outcome",
          body: "TypeStrip shipped as a functional iOS product with a clean, focused interface. The project reinforced the value of restraint in design and building features that serve the primary user goal without distraction.",
        },
      ],
      links: [{ label: "website", href: "https://typestrip.com" }],
    },
    {
      id: "citestack",
      title: "CiteStack",
      subtitle: "citation + research workflow",
      sections: [
        {
          heading: "Overview",
          body: "CiteStack is a lightweight system for capturing sources, organizing notes, and keeping citations close to the writing process.",
        },
        {
          heading: "My Role",
          body: "product design + front-end implementation.",
        },
      ],
      links: [{ label: "github", href: "https://github.com/signalandform/citestack" }],
    },
    {
      id: "countrtop",
      title: "CountrTop",
      sections: [
        {
          heading: "Overview",
          body: "CountrTop is a web-based platform supporting customer ordering, vendor operations, and administrative workflows. The product was informed directly by real-world experience using a Kitchen Display System (KDS) in a food-service environment.",
        },
        {
          heading: "Problem",
          body: "Many operational tools fail because they’re designed without understanding how work actually happens. In food service, speed, clarity, and error prevention matter more than feature density.",
        },
        {
          heading: "My Role",
          body: "I designed and implemented responsive UI across customer-facing pages, vendor workflows, and admin views. I was responsible for UX structure, visual design, and front-end execution.",
        },
        {
          heading: "Design Process",
          body: "I approached the product as a system of roles rather than a single interface. Early exploration focused on separating concerns between customers, vendors, and administrators while maintaining consistency across the platform. I intentionally avoided building features that would slow down core workflows, prioritizing clarity and speed over completeness.",
        },
        {
          heading: "Solution",
          body: "The resulting design supports multiple user roles with clear, focused interfaces tailored to their specific needs. Reusable UI patterns and consistent layouts help reduce cognitive load and support scalability.",
        },
        {
          heading: "Outcome",
          body: "CountrTop demonstrates how operational insight can improve product design by guiding better decisions about scope, structure, and interaction design.",
        },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/signalandform/countrtop" },
        { label: "Sandbox Vendor", href: "https://sunset.staging.countrtop.com" },
        { label: "Sandbox KDS (1234)", href: "https://kds.staging.countrtop.com" },
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* hero */}
      <section className="px-6 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">jack nelson</h1>
              <p className="mt-4 text-lg text-contrast/70">
                product designer blending ux, visual craft, and implementation
              </p>
            </div>

            {/* profile spot (swap for image later) */}
            <div className="shrink-0">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(157,194,234,0.35),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(155,144,201,0.28),transparent_60%)]" />
                <div className="relative flex h-full w-full items-center justify-center font-mono text-sm uppercase tracking-widest text-contrast/70">
                  jn
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-contrast px-6 py-3 text-sm font-medium text-base hover:bg-contrast/90"
            >
              portfolio
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-contrast/90 hover:bg-white/5"
            >
              contact me
            </Link>
          </div>

          {/* about */}
          <div className="mt-14 rounded-3xl border border-white/10 bg-card p-8">
            <h2 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
              about me
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-contrast/70">
              <p>
                I’m a product designer with a background in front-end development
                and a deep interest in visual craft. My work sits at the
                intersection of UX, interface design, and creative exploration,
                where systems, aesthetics, and usability meet.
              </p>
              <p>
                I’ve designed and shipped digital products end-to-end, from early
                concept and wireframes to polished UI and production-ready
                implementation. Alongside product work, I maintain an active
                creative practice across illustration, branding, and experimental
                visual design, which informs my sense of composition, hierarchy,
                and interaction.
              </p>
              <p>
                I enjoy working on products where clarity, performance, and
                thoughtful design decisions matter—especially SaaS platforms,
                internal tools, and systems-driven experiences built to hold up in
                real use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* portfolio */}
      <section id="portfolio" className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
            portfolio
          </h2>

          <div className="mt-8 space-y-8">
            {portfolioItems.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-28 rounded-3xl border border-white/10 bg-card p-8"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    {item.subtitle ? (
                      <p className="mt-1 text-sm text-contrast/65">
                        {item.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                {item.description ? (
                  <p className="mt-5 leading-relaxed text-contrast/70">
                    {item.description}
                  </p>
                ) : null}

                {item.meta ? (
                  <p className="mt-5 text-sm leading-relaxed text-contrast/65">
                    <span className="font-medium text-contrast/80">
                      {item.metaLabel || ""}
                    </span>{" "}
                    {item.meta}
                  </p>
                ) : null}

                {item.sections?.length ? (
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {item.sections.map((s) => (
                      <div key={s.heading}>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-contrast/60">
                          {s.heading}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-contrast/70">
                          {s.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {item.links?.length ? (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {item.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-contrast/80 hover:border-white/25 hover:bg-white/10"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="px-6 pb-24 pt-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-card p-10">
          <h2 className="font-mono text-sm uppercase tracking-widest text-contrast/60">
            contact
          </h2>
          <p className="mt-4 text-lg text-contrast/70">
            fill out the form or email me at{" "}
            <Link
              href="mailto:hello@jacknel.com"
              className="text-[color:var(--accent)] hover:underline underline-offset-4"
            >
              hello@jacknel.com
            </Link>
          </p>

          <ContactForm />

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <span className="text-contrast/60">(214) 803 2520</span>
            <Link
              href="http://instagram.com/mjacknel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-contrast/60 hover:text-contrast"
            >
              instagram
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
