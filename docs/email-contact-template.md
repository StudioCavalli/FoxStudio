# EmailJS — contact template

Companion notes for `docs/email-contact-template.html`. Keep this doc
**outside** the EmailJS dashboard — its `{{var}}` references would
otherwise be parsed as template variables and trigger
"dynamic variables are corrupted" 400s.

## How to apply

1. emailjs.com → Email Templates → open the template referenced by
   `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.
2. Edit Content → switch to HTML mode → paste the entire content of
   `email-contact-template.html` verbatim. Save.
3. Settings tab — fill these four fields:

   | Field | Value |
   | --- | --- |
   | To Email | your inbox (hard-coded) |
   | From Name | `FoxStudio` (or `{{name}}` for per-sender) |
   | Reply To | `{{email}}` |
   | Subject | `{{subject}}` |

   Do **not** reference any variable name not in the list below —
   that's the #1 cause of "corrupted variables".

## Variables sent by the form

`components/contact/ContactForm.tsx` always sends this fixed set, no
optional fields, no conditionals on the template side needed.

| Name | Description |
| --- | --- |
| `type` | `incubator` \| `company` \| `talent` |
| `name` | sender name |
| `email` | sender email (also aliased as `from_email`, `reply_to`) |
| `subject` | `[FoxStudio · <type>] <name>` |
| `details` | pre-formatted multi-line string, key/value pairs aligned. Empty if no extra field filled. |
| `message` | free-text message body |
| `from_name` | alias of `name` (for default EmailJS settings) |
| `from_email` | alias of `email` |
| `reply_to` | alias of `email` |
| `to_name` | constant `FoxStudio` |

## Design constraints honored by the HTML

- System fonts only — Geist isn't loadable in mail clients.
- Inline styles only — Gmail/Outlook strip `<style>` blocks.
- Single 600 px table, single column — works on iOS Mail / Outlook desktop.
- No external images — every byte is in the markup.
