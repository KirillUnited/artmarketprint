Project: Flower Subscription (Next.js 15, App Router). 
Goal: secure, testable, and maintainable service integrated with AmoCRM for leads.
Key principles:
- Server-side only for all external secrets and AmoCRM API calls. No secrets in client code.
- Use Next.js App Router with Server Components for data fetching; use Client Components only for interactive UI.
- All external API calls to AmoCRM go through next/api route handlers (app/api/amo/*). Do NOT call AmoCRM from the browser.
- Keep state in DB (SanityCMS) and store AmoCRM IDs in user records.
- Always prefer small, focused changes and create an RFC for cross-cutting architectural changes.

# Project rules for Cursor — Flower Subscription (Next.js 15 + AmoCRM)
# RANKING: Strict rules (must follow) > Medium rules (should follow) > Soft rules (suggestions)

---STRICT---
1. SECRETS: Never output, store, or commit any secrets (AMO client_secret, access tokens, DB passwords). If you need to persist, instruct to use .env.local and server environment variables. If a user pastes a secret, instruct them to rotate it and remove from VCS.
2. SERVER_ONLY_AMO: All AmoCRM calls must be server-side only. Place calls under app/api/amo/*. Do NOT put fetch() to AmoCRM in client components or public code.
3. AUTH_FLOW: Implement AmoCRM OAuth2 on server route: app/api/amo/refresh-token, app/api/amo/oauth-callback. Do not embed client_secret in the client code.
4. DB_PERSIST: Store amo_lead_id, amo_contact_id in the user record in DB. Never rely on transient responses only.
5. NO_AUTOMATIC_OVERWRITE: Do NOT overwrite existing files without creating a git patch, tests, and PR description. Always produce a commit message and migration steps.

---MEDIUM---
6. NEXTJS_PATTERNS: Use Next.js App Router. Prefer Server Components for pages and data fetching. Use client components only with 'use client' and minimal footprint.
7. SCHEMAS: Validate all request bodies with a schema (zod or joi). Sanitize before sending to AmoCRM.
8. API_ROUTING: API routes must be grouped: /api/auth/*, /api/amo/*, /api/webhooks/*.
9. WEBHOOKS: Webhook handlers must be idempotent, verify signatures, and enqueue background jobs for long tasks.
10. TESTS: Add unit/integration tests for any route that touches AmoCRM. Mock AmoCRM responses.

---SOFT---
11. STYLE: TypeScript strict mode. Prefer functional components, small hooks. Use tailwind/shadcn styles if present.
12. DOCS: Update /docs/crm-dashboard/architecture.md when making architecture changes. Update rules if new conventions are chosen.
13. RFC_FLOW: For major changes (schema, migration, new persistent services), generate an RFC draft (summary, motivation, rollback).
14. UX: For registration flow, ensure referral link generation is idempotent and added to user profile before creating AmoCRM lead.

---WHEN_UNSURE---
- If you are unsure about AmoCRM field ids/custom_field slugs, propose a safe mapping and add TODO to verify in AmoCRM account. Ask the human for confirmation.

---OUTPUT_FORMAT---
When making code changes, create:
- a git patch or list of changed files
- a PR description (title, summary, migration steps, test plan)
- tests added or updated
