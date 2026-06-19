"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { site } from "@/content/site";
import { getOffer } from "@/content/offer";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";

// Mail handlers (notably Windows/Outlook) cap mailto URLs around ~2k chars;
// the description cap keeps the encoded brief safely under it.
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

/**
 * Purposeful intake instead of a bare mailto. No backend by design: submit
 * composes a structured brief and opens the visitor's own mail app —
 * nothing is collected or stored by the site.
 */
export function IntakeForm({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const projectTypes = dict.form.typeOptions;
  const budgets = dict.form.budgetOptions;
  const timelines = dict.form.timelineOptions;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<string>(projectTypes[0]);
  const [budget, setBudget] = useState<string>(budgets[4]);
  const [timeline, setTimeline] = useState<string>(timelines[2]);
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // RFC 6068: mailto bodies need CRLF line breaks (lone %0A gets dropped by
  // classic Outlook).
  const brief = [
    `${dict.form.briefName}: ${name || dict.form.briefEmpty}`,
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

  const remaining = DESCRIPTION_MAX - description.length;

  return (
    // Native constraint validation handles empty required fields (focus +
    // message) — no disabled-button dead end for keyboard/SR users.
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
        // Surface a fallback: if no mail client handles the mailto, the click
        // does nothing — this confirmation points to copy + the direct address
        // so the lead is never silently lost.
        setSubmitted(true);
      }}
    >
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
        <Field index="02" label={dict.form.company} optional={dict.form.optional}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={dict.form.companyPlaceholder}
            autoComplete="organization"
            className={controlBase}
          />
        </Field>
      </div>

      <div className="grid items-start gap-6 sm:grid-cols-3">
        <Field index="03" label={dict.form.building}>
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
        <Field index="04" label={dict.form.budget} helper={dict.form.budgetHint}>
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
        <Field index="05" label={dict.form.timeline}>
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
            06
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

      <div className="flex flex-wrap items-center gap-5">
        <Magnetic>
          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-colors hover:bg-fg"
          >
            {dict.form.send}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
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

      {submitted && (
        <p
          role="status"
          className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg-muted"
        >
          {dict.form.sentHint}{" "}
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
