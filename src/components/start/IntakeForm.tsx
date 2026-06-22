"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { site } from "@/content/site";
import { getOffer } from "@/content/offer";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";

// Mail handlers (notably Windows/Outlook) cap mailto URLs around ~2k chars;
// the description cap keeps the encoded fallback brief safely under it.
const DESCRIPTION_MAX = 500;

// Shared control surface — one focus-glow language for inputs, selects, and
// the textarea so the whole form reacts the same way.
const controlBase =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-fg transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-fg-faint hover:border-fg-faint/70 focus:border-accent focus:bg-surface focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent-dim)]";
const selectClasses = cn(controlBase, "cursor-pointer appearance-none pr-11");

function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-fg-faint transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 5l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Labelled field — mono index lights up on focus, optional tag inline,
 *  helper text sits *below* the control so neighbouring fields in a row stay
 *  on the same baseline regardless of hint length. */
function Field({
  index,
  label,
  optional,
  helper,
  children,
}: {
  index: string;
  label: string;
  optional?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group flex flex-col gap-2">
      <span className="flex items-baseline gap-2 text-sm font-medium">
        <span className="font-mono text-[0.7rem] text-fg-faint transition-colors group-focus-within:text-accent">
          {index}
        </span>
        {label}
        {optional && (
          <span className="font-normal text-fg-faint">{optional}</span>
        )}
      </span>
      {children}
      {helper && <span className="text-xs text-fg-faint">{helper}</span>}
    </label>
  );
}

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

/**
 * Project intake. Submits the brief to /api/contact, which emails it straight
 * to the studio inbox — no visitor mail client involved. If that backend isn't
 * configured yet (or the request fails), it falls back to the visitor's mail
 * app via a prebuilt mailto, so a lead is never silently lost.
 */
export function IntakeForm({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const projectTypes = dict.form.typeOptions;
  const budgets = dict.form.budgetOptions;
  const timelines = dict.form.timelineOptions;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<string>(projectTypes[0]);
  const [budget, setBudget] = useState<string>(budgets[4]);
  const [timeline, setTimeline] = useState<string>(timelines[2]);
  const [description, setDescription] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // RFC 6068: mailto bodies need CRLF line breaks (lone %0A gets dropped by
  // classic Outlook). Used for the copy action and the mailto fallback.
  const brief = [
    `${dict.form.briefName}: ${name || dict.form.briefEmpty}`,
    `Email: ${email || dict.form.briefEmpty}`,
    `${dict.form.briefCompany}: ${company || dict.form.briefEmpty}`,
    `${dict.form.briefLooking}: ${type}`,
    `${dict.form.briefBudget}: ${budget}`,
    `${dict.form.briefTimeline}: ${timeline}`,
    "",
    dict.form.briefAbout,
    description || dict.form.briefEmpty,
  ].join("\r\n");

  const subject = `${dict.form.mailtoSubject} — ${type}${name ? ` — ${name}` : ""}`;
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(
        `${dict.form.briefTo}: ${site.email}\n${dict.form.briefSubject}: ${subject}\n\n${brief}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto path still works */
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          type,
          budget,
          timeline,
          description,
          lang,
          company_url: honeypot, // honeypot — must stay empty
        }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 503) {
        // Email backend not configured yet — open the visitor's mail client.
        window.location.href = href;
        setStatus("mailto");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const remaining = DESCRIPTION_MAX - description.length;
  const sending = status === "sending";

  return (
    // Native constraint validation handles empty required fields (focus +
    // message) before submit runs — no disabled-button dead end for SR users.
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="grid items-start gap-6 sm:grid-cols-2">
        <Field index="01" label={dict.form.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={dict.form.namePlaceholder}
            autoComplete="name"
            required
            className={controlBase}
          />
        </Field>
        <Field index="02" label={dict.form.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.form.emailPlaceholder}
            autoComplete="email"
            required
            className={controlBase}
          />
        </Field>
      </div>

      <div className="grid items-start gap-6 sm:grid-cols-2">
        <Field index="03" label={dict.form.company} optional={dict.form.optional}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={dict.form.companyPlaceholder}
            autoComplete="organization"
            className={controlBase}
          />
        </Field>
        <Field index="04" label={dict.form.building}>
          <span className="relative block">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectClasses}
            >
              {projectTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Chevron />
          </span>
        </Field>
      </div>

      <div className="grid items-start gap-6 sm:grid-cols-2">
        <Field index="05" label={dict.form.budget} helper={dict.form.budgetHint}>
          <span className="relative block">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={selectClasses}
            >
              {budgets.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Chevron />
          </span>
        </Field>
        <Field index="06" label={dict.form.timeline}>
          <span className="relative block">
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className={selectClasses}
            >
              {timelines.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Chevron />
          </span>
        </Field>
      </div>

      <label className="group flex flex-col gap-2">
        <span className="flex items-baseline gap-2 text-sm font-medium">
          <span className="font-mono text-[0.7rem] text-fg-faint transition-colors group-focus-within:text-accent">
            07
          </span>
          {dict.form.description}
        </span>
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={dict.form.descriptionPlaceholder}
            rows={5}
            required
            maxLength={DESCRIPTION_MAX}
            className={cn(controlBase, "resize-none pb-8")}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-3 right-4 font-mono text-xs tabular-nums transition-colors",
              remaining <= 50 ? "text-accent" : "text-fg-faint",
            )}
          >
            {description.length}/{DESCRIPTION_MAX}
          </span>
        </div>
        <span className="text-xs text-fg-faint">
          {t(dict.form.descriptionHint, { max: DESCRIPTION_MAX })}
        </span>
      </label>

      {/* Honeypot — hidden from people, catches bots. Off-screen, not focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Magnetic>
          <button
            type="submit"
            disabled={sending}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-colors hover:bg-fg disabled:opacity-60"
          >
            {sending ? dict.form.sending : dict.form.send}
            {!sending && (
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            )}
          </button>
        </Magnetic>
        <button
          type="button"
          onClick={copyBrief}
          className="text-sm text-fg-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
        >
          <span aria-live="polite">
            {copied ? dict.form.copied : dict.form.copyInstead}
          </span>
        </button>
      </div>

      {status === "sent" && (
        <p
          role="status"
          className="rounded-xl border border-accent/40 bg-accent-dim px-4 py-3 text-sm text-fg"
        >
          {dict.form.sent}
        </p>
      )}

      {(status === "error" || status === "mailto") && (
        <p
          role="status"
          className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg-muted"
        >
          {status === "error" ? dict.form.error : dict.form.sentHint}{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {site.email}
          </a>
          .
        </p>
      )}

      <p className="text-sm text-fg-faint">
        {dict.form.footerHelper}
        <span className="text-fg-muted">{getOffer(lang).responsePromise}</span>
      </p>
    </form>
  );
}
