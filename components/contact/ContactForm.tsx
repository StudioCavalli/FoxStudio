"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";

import { type ContactState, type ContactType, submitContact } from "@/lib/contact/actions";

const FIELD_BASE =
  "w-full border-0 border-b border-border bg-transparent py-[var(--spacing-3)] text-[var(--text-body)] focus:border-focus focus:outline-none";

const LABEL =
  "block font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary";

const initialState: ContactState = { status: "idle" };

export function ContactForm({ type }: { type: ContactType }) {
  const t = useTranslations("Contact");
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-[var(--spacing-6)]">
      <input type="hidden" name="type" value={type} />
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

        {state.status !== "idle" && (
          <output
            className={`font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] ${
              state.status === "ok" ? "text-fg" : "text-fg-secondary"
            }`}
          >
            {state.message}
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
