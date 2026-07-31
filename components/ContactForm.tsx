"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Κάτι πήγε στραβά. Δοκίμασε ξανά.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Κάτι πήγε στραβά. Δοκίμασε ξανά.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        <p className="font-semibold">Το μήνυμά σου στάλθηκε!</p>
        <p className="mt-1 text-sm">Θα επικοινωνήσουμε μαζί σου το συντομότερο δυνατό.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-stone-700">
            Ονοματεπώνυμο *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[color:var(--color-accent)] focus:ring-1 focus:ring-[color:var(--color-accent)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-700">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[color:var(--color-accent)] focus:ring-1 focus:ring-[color:var(--color-accent)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-stone-700">
          Τηλέφωνο
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-md border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[color:var(--color-accent)] focus:ring-1 focus:ring-[color:var(--color-accent)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-stone-700">
          Μήνυμα *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[color:var(--color-accent)] focus:ring-1 focus:ring-[color:var(--color-accent)]"
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-600">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-[color:var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Αποστολή..." : "Αποστολή μηνύματος"}
      </button>
    </form>
  );
}
