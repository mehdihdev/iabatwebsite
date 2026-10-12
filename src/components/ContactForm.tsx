"use client";
import { useState } from "react";
import { EMAIL } from "@/lib/site";

const TOPICS = ["General question", "Weekend school", "Building project", "Religious services"];

// There is no backend, so the form opens the visitor's email app with the
// message pre-filled and addressed to IABAT.
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const subject = `${topic} — ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  if (opened) {
    return (
      <div className="py-6 text-center">
        <h2 className="mb-2 font-serif text-[30px] font-semibold">JazakAllah khair</h2>
        <p className="mb-5 text-base text-muted">
          Your email app should have opened with your message ready to send. If it didn&apos;t, email us directly at{" "}
          <a href={`mailto:${EMAIL}`} className="text-link">
            {EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setOpened(false)}
          className="cursor-pointer rounded-md border border-line-strong bg-white px-6 py-3 text-[15px] font-semibold text-ink"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="m-0 font-serif text-[30px] font-semibold">Send a message</h2>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Name
        <input name="name" required type="text" autoComplete="name" className="field font-normal" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Email
        <input name="email" required type="email" autoComplete="email" className="field font-normal" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Topic
        <select name="topic" className="field font-normal">
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Message
        <textarea name="message" required rows={5} className="field resize-y font-normal" />
      </label>
      <button
        type="submit"
        className="cursor-pointer rounded-md border-0 bg-brand px-6 py-3.5 text-base font-semibold text-white hover:bg-brand-dark"
      >
        Send message
      </button>
      <p className="m-0 text-center text-[13px] text-muted">Opens your email app with the message addressed to {EMAIL}.</p>
    </form>
  );
}
