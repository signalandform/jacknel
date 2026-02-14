"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "ready";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const status: Status = useMemo(() => {
    if (!name.trim() || !email.trim() || !message.trim()) return "idle";
    return "ready";
  }, [name, email, message]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("contact from jacknel.com");
    const body = encodeURIComponent(
      `name: ${name}\nemail: ${email}\n\nmessage:\n${message}\n`
    );
    return `mailto:hello@jacknel.com?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  const inputClass =
    "w-full rounded-2xl border border-contrast/10 bg-contrast/5 px-5 py-4 text-contrast placeholder:text-contrast/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]";

  return (
    <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-contrast/70">
            name <span className="text-contrast/50">*</span>
          </label>
          <input
            id="name"
            name="name"
            className={`${inputClass} mt-2`}
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-contrast/70">
            email <span className="text-contrast/50">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`${inputClass} mt-2`}
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-contrast/70">
          message <span className="text-contrast/50">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className={`${inputClass} mt-2 min-h-[160px] resize-y`}
          placeholder="tell me what you’re working on"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center rounded-full bg-contrast px-6 py-3 text-sm font-medium text-base hover:bg-contrast/90"
          aria-disabled={status !== "ready"}
          onClick={(e) => {
            if (status !== "ready") e.preventDefault();
          }}
        >
          {status === "ready" ? "open email" : "fill required fields"}
        </a>
        <p className="text-sm text-contrast/55">
          this will open your email app and prefill the message.
        </p>
      </div>
    </form>
  );
}
