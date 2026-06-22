import { site } from "@/content/site";

// Server-side contact delivery. The intake form POSTs the brief here; it's
// emailed to the studio inbox (CONTACT_TO) and the visitor gets an automatic
// acknowledgement. Delivery uses Resend's HTTP API over fetch — no SDK. Until
// RESEND_API_KEY is set, we return 503 so the form falls back to mailto.

const MAX = {
  name: 120,
  email: 200,
  company: 160,
  field: 120,
  description: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const escapeHtml = (s: string): string =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );

// Visitor acknowledgement copy, by form language.
const ACK = {
  en: {
    subject: "We got your brief — noqyris",
    body: (name: string) =>
      `Hi ${name || "there"},\n\nThanks for reaching out — we've received your brief and will reply within one business day.\n\n— noqyris`,
  },
  sr: {
    subject: "Primili smo tvoj brief — noqyris",
    body: (name: string) =>
      `Zdravo${name ? ` ${name}` : ""},\n\nHvala što si se javio/la — primili smo tvoj brief i javljamo se u roku od jednog radnog dana.\n\n— noqyris`,
  },
} as const;

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real users never see/fill this; bots do. Accept silently.
  if (clean(body.company_url, 200) !== "") {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const company = clean(body.company, MAX.company);
  const type = clean(body.type, MAX.field);
  const budget = clean(body.budget, MAX.field);
  const timeline = clean(body.timeline, MAX.field);
  const description = clean(body.description, MAX.description);
  const lang = body.lang === "sr" ? "sr" : "en";

  if (!name || !description) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — signal the client to use its mailto fallback.
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const to = process.env.CONTACT_TO || site.email; // studio inbox (leads land here)
  const from = process.env.CONTACT_FROM || "noqyris <onboarding@resend.dev>"; // lead sender → you
  const ackFrom = process.env.CONTACT_ACK_FROM || from; // acknowledgement sender → visitor

  const subject = `New project inquiry — ${type || "general"}${
    name ? ` — ${name}` : ""
  }`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Looking for", type || "—"],
    ["Budget", budget || "—"],
    ["Timeline", timeline || "—"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project:",
    description,
  ].join("\n");

  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
    <h2 style="margin:0 0 12px">New project inquiry</h2>
    <table style="border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:2px 16px 2px 0;color:#666">${k}</td><td><strong>${escapeHtml(
            v,
          )}</strong></td></tr>`,
      )
      .join("")}</table>
    <p style="margin:16px 0 4px;color:#666">Project</p>
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(description)}</p>
  </div>`;

  // 1) Lead notification to the studio. Reply goes straight to the visitor.
  let leadRes: Response;
  try {
    leadRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({ from, to, reply_to: email, subject, text, html }),
    });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  if (!leadRes.ok) {
    const detail = await leadRes.text().catch(() => "");
    console.error("Resend lead send failed:", leadRes.status, detail);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  // 2) Acknowledgement to the visitor — best-effort; a failure here must not
  //    fail the submission (the lead already went through). Reply goes to the
  //    studio inbox so the visitor can write back.
  const ack = ACK[lang];
  const ackText = ack.body(name);
  try {
    const ackRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: ackFrom,
        to: email,
        reply_to: to,
        subject: ack.subject,
        text: ackText,
        html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111"><p style="white-space:pre-wrap;margin:0">${escapeHtml(
          ackText,
        )}</p></div>`,
      }),
    });
    if (!ackRes.ok) {
      console.error("Resend ack send failed:", ackRes.status);
    }
  } catch {
    /* ignore — visitor already sees the on-screen confirmation */
  }

  return Response.json({ ok: true });
}
