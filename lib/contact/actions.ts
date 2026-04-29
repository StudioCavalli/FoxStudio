"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

import { SITE } from "@/lib/site";
import { rateLimit } from "./rateLimit";

const baseSchema = z.object({
  // Honeypot — must be empty. Bots fill all fields.
  hp: z.string().max(0, "spam").default(""),
  name: z.string().min(1).max(100),
  email: z.string().email().max(160),
  message: z.string().min(10).max(2000),
});

const incubatorSchema = baseSchema.extend({
  type: z.literal("incubator"),
  organization: z.string().min(1).max(120),
  program: z.string().max(160).optional(),
});

const companySchema = baseSchema.extend({
  type: z.literal("company"),
  company: z.string().min(1).max(120),
  topic: z.enum(["3d", "ai", "edge", "perf", "other"]),
  budget: z.enum(["<10k", "10-50k", "50-200k", ">200k", "unsure"]).optional(),
});

const talentSchema = baseSchema.extend({
  type: z.literal("talent"),
  role: z.string().min(1).max(120),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
});

const contactSchema = z.discriminatedUnion("type", [incubatorSchema, companySchema, talentSchema]);

export type ContactType = "incubator" | "company" | "talent";

export type ContactState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Some fields are missing or invalid." };
  }

  if (parsed.data.hp) {
    // Honeypot triggered — pretend success but discard.
    return { status: "ok", message: "Thanks, we'll get back to you." };
  }

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return {
      status: "error",
      message: "Too many submissions. Try again in a bit.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / unset : log, don't fail.
    console.info("[contact] (no RESEND_API_KEY) submission:", parsed.data);
    return { status: "ok", message: "Logged. Resend not configured in this environment." };
  }

  const resend = new Resend(apiKey);
  const subject = `[${SITE.name} · ${parsed.data.type}] ${parsed.data.name}`;
  const lines: string[] = [
    `Type: ${parsed.data.type}`,
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
  ];

  if (parsed.data.type === "incubator") {
    lines.push(`Organization: ${parsed.data.organization}`);
    if (parsed.data.program) lines.push(`Program: ${parsed.data.program}`);
  } else if (parsed.data.type === "company") {
    lines.push(`Company: ${parsed.data.company}`);
    lines.push(`Topic: ${parsed.data.topic}`);
    if (parsed.data.budget) lines.push(`Budget: ${parsed.data.budget}`);
  } else {
    lines.push(`Role: ${parsed.data.role}`);
    if (parsed.data.portfolioUrl) lines.push(`Portfolio: ${parsed.data.portfolioUrl}`);
  }

  lines.push("", "Message:", parsed.data.message);

  try {
    const { error } = await resend.emails.send({
      from: `${SITE.name} <noreply@${new URL(SITE.url).hostname}>`,
      to: SITE.contact.email,
      replyTo: parsed.data.email,
      subject,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error", message: "Failed to send. Please email us directly." };
    }

    return { status: "ok", message: "Thanks, we'll get back to you." };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return { status: "error", message: "Failed to send. Please email us directly." };
  }
}
