"use client";

import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import { useState } from "react";

const FIELD_BASE =
  "w-full border-0 border-b border-border bg-transparent py-[var(--spacing-3)] text-[var(--text-body)] focus:border-focus focus:outline-none";

const LABEL =
  "block font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary";

export type ContactType = "incubator" | "company" | "talent";

type Status =
  | { kind: "idle" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function ContactForm({ type }: { type: ContactType }) {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if ((data.get("hp") as string)?.length) {
      setStatus({ kind: "ok", message: t("successMsg") });
      form.reset();
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ kind: "error", message: t("errorSend") });
      return;
    }

    const get = (k: string) => String(data.get(k) ?? "");

    // Build a plain-text "details" block containing only the rows
    // relevant to the selected type. The template renders it inside a
    // <pre>-style div so newlines + alignment are preserved. Avoids
    // {{#if}} conditionals (not reliable across EmailJS template tiers)
    // while keeping the email visually structured.
    const rows: Array<[string, string]> = [];
    if (type === "incubator") {
      if (get("organization")) rows.push(["Structure", get("organization")]);
      if (get("program")) rows.push(["Programme", get("program")]);
    } else if (type === "company") {
      if (get("company")) rows.push(["Société", get("company")]);
      if (get("topic")) rows.push(["Sujet", get("topic")]);
      if (get("budget")) rows.push(["Budget", get("budget")]);
    } else {
      if (get("role")) rows.push(["Rôle", get("role")]);
      if (get("portfolioUrl")) rows.push(["Portfolio", get("portfolioUrl")]);
    }
    const labelWidth = Math.max(...rows.map(([k]) => k.length), 0);
    const details = rows.map(([k, v]) => `${k.padEnd(labelWidth, " ")}  ${v}`).join("\n");

    const name = get("name");
    const email = get("email");
    const subject = `[FoxStudio · ${type}] ${name}`;

    // EmailJS default templates often reference reserved-looking
    // variables (from_name, from_email, reply_to, to_name) in their
    // Settings tab. Sending them as aliases avoids "dynamic variables
    // are corrupted" 400s when the template uses any of them.
    const params: Record<string, string> = {
      type,
      name,
      email,
      subject,
      details,
      message: get("message"),
      from_name: name,
      from_email: email,
      reply_to: email,
      to_name: "FoxStudio",
    };

    setPending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
      setStatus({ kind: "ok", message: t("successMsg") });
      form.reset();
    } catch (err) {
      const e = err as { status?: number; text?: string };
      console.error("[contact] EmailJS error:", e.status, e.text, err);
      setStatus({ kind: "error", message: t("errorSend") });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-[var(--spacing-6)]">
      {/* Honeypot — visually hidden but reachable to bots */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <Field label={t("name")} name="name" required />
      <Field label={t("email")} name="email" type="email" required />

      {type === "incubator" && (
        <>
          <Field label={t("organization")} name="organization" required />
          <Field label={t("program")} name="program" />
        </>
      )}

      {type === "company" && (
        <>
          <Field label={t("company")} name="company" required />

          <div>
            <label htmlFor="topic" className={LABEL}>
              {t("topic")}
            </label>
            <select id="topic" name="topic" required className={FIELD_BASE}>
              <option value="3d">3D / WebGPU</option>
              <option value="ai">AI</option>
              <option value="edge">Edge</option>
              <option value="perf">Performance</option>
              <option value="other">{t("topicOther")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className={LABEL}>
              {t("budget")}
            </label>
            <select id="budget" name="budget" className={FIELD_BASE}>
              <option value="unsure">{t("budgetUnsure")}</option>
              <option value="<10k">&lt; 10k €</option>
              <option value="10-50k">10–50k €</option>
              <option value="50-200k">50–200k €</option>
              <option value=">200k">&gt; 200k €</option>
            </select>
          </div>
        </>
      )}

      {type === "talent" && (
        <>
          <Field label={t("role")} name="role" required />
          <Field label={t("portfolioUrl")} name="portfolioUrl" type="url" />
        </>
      )}

      <div>
        <label htmlFor="message" className={LABEL}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          className={`${FIELD_BASE} resize-y`}
        />
      </div>

      <div className="flex items-center justify-between gap-[var(--spacing-5)]">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 border border-fg bg-transparent px-[var(--spacing-5)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] transition-colors duration-[var(--duration-fast)] hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? t("sending") : t("send")} ▸
        </button>

        {status.kind !== "idle" && (
          <output
            className={`font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] ${
              status.kind === "ok" ? "text-fg" : "text-fg-secondary"
            }`}
          >
            {status.message}
          </output>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={LABEL}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={type === "email" ? "email" : name === "name" ? "name" : "off"}
        className={FIELD_BASE}
      />
    </div>
  );
}
