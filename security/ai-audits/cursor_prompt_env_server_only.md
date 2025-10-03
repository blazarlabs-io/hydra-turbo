# Cursor Task: Server‑Side Env Refactor for `apps/merchant` (Monorepo, Next.js)

**Role**: You are a senior Next.js/TypeScript engineer working in a PNPM monorepo.  
**Objective**: In the `apps/merchant` app, **remove all client exposure of env vars** and ensure **all env access happens server‑side only**. Update code accordingly, then **build and test**. Preserve behavior.

---

## Repository & Scope

- **Monorepo** with PNPM workspaces.
- Target app: **`apps/merchant`** (do not modify other packages/apps unless explicitly required by imports used by `apps/merchant`).  
- Existing env files: **`.env.development`** and **`.env.production`**. They currently contain variables with the **`NEXT_PUBLIC_`** prefix. Those values must **no longer be consumed on the client** in `apps/merchant`.

> **Security Goal**: No secrets or sensitive configuration should be readable in client bundles. All previously `NEXT_PUBLIC_` usages should be migrated so **only the server** reads env and the client only receives **non‑sensitive derived data** when strictly necessary.

---

## Deliverables (must provide all)

1. A **summary report** (`apps/merchant/ENV_MIGRATION_REPORT.md`) that includes:
   - Inventory of all env usages (file + line + variable name + component type: server/client/shared).
   - Changes performed and the rationale (per usage cluster).
   - Final verification steps and results (client bundle string scan; see below).
2. A **server‑only env module** at `apps/merchant/src/lib/env.ts` (details below).
3. Code modifications so **no env vars are read in client code**. If a value is truly needed by the client, expose a **minimal, safe** value via server (RSC, server actions, or API route), **never process.env** directly.
4. Successful build & tests for `apps/merchant` using `pnpm` with logs captured into the report.
5. A clean Git branch + commits with clear messages and a final diff summary in the report.

---

## Constraints & Rules

- **Do not break behavior**. Where possible, keep variable semantics; only remove `NEXT_PUBLIC_` *exposure*, not functionality.
- **No env reads** in files or components marked with `"use client"` or otherwise executed on the client.
- Prefer **RSC/server actions**. If imperative, use a **server API route** to deliver **non‑sensitive** computed values.
- If some `NEXT_PUBLIC_` values are actually non‑sensitive and must remain client‑visible (e.g., a public analytics key), explicitly document why in the report and gate it via a minimal, whitelisted server‑exposed shape. Default stance: **do not expose**.
- Add **runtime validation** for env on the server with Zod (preferred) or a minimal validator. Fail fast with clear errors in development.
- Keep changes **scoped to `apps/merchant`**; do not alter workspace tooling unless required for build to pass.

---

## Step‑by‑Step Plan

### 1) Inventory all env usages
- Search within `apps/merchant` for env reads:
  ```bash
  rg -n --glob '!**/node_modules/**' '(process\.env\.|NEXT_PUBLIC_)' apps/merchant > /tmp/merchant_env_usages.txt
  ```
- Classify each hit as **client** (in `"use client"` component or browser‑only code), **server** (route handlers, server actions, RSC, API, getServerSideProps if legacy), or **shared**.
- Add the annotated list to `ENV_MIGRATION_REPORT.md`.

### 2) Add a server‑only env module
Create `apps/merchant/src/lib/env.ts`:
```ts
// apps/merchant/src/lib/env.ts
import 'server-only';
import { z } from 'zod';

// Prefer non-public names. For backwards-compat, allow reading legacy NEXT_PUBLIC_ during migration
// but NEVER export them directly to client. Warn if fallback is used.
const schema = z.object({
  // Example mappings — replace/add according to the inventory you produce:
  // If you had NEXT_PUBLIC_API_BASE_URL before, prefer API_BASE_URL now.
  API_BASE_URL: z.string().url(),
  // Add all required server-only secrets here (no NEXT_PUBLIC_ names).
  // Example:
  // AUTH_SECRET: z.string().min(1),
})
.strict();

function read(name: string): string | undefined {
  // Prefer server-only names, fallback to legacy NEXT_PUBLIC_ for *reading only* during migration.
  return process.env[name] ?? process.env[`NEXT_PUBLIC_${name}`];
}

const raw = {
  API_BASE_URL: read('API_BASE_URL'),
  // AUTH_SECRET: read('AUTH_SECRET'),
};

const env = schema.parse(raw);

export { env };
```

> Update the schema keys to match the **actual** variables you find. For each legacy `NEXT_PUBLIC_X`, plan to **rename** to `X` server‑only. During migration, allow fallback reads but document which ones were converted.

### 3) Stop reading env in client code
- Any file with `"use client"` or that runs in the browser must **not** import `process.env` or `env.ts`.
- Replace client usage with **server‑provided props** (RSC pattern) or an **API route**:
  - For RSC (recommended): read from `env` in a server component and pass down **only the minimal primitive** needed.
  - For API route: create `apps/merchant/app/api/config/route.ts` that returns a **narrow, non‑sensitive** shape.
    ```ts
    // apps/merchant/app/api/config/route.ts
    import 'server-only';
    import { NextResponse } from 'next/server';
    import { env } from '@/lib/env';

    export async function GET() {
      // Return only harmless values (e.g., a public base path). Never secrets.
      return NextResponse.json({ baseUrl: env.API_BASE_URL });
    }
    ```

### 4) Update all call sites
- For each client usage discovered in Step 1:
  - If it was reading `NEXT_PUBLIC_*`, remove that read and switch to data coming from server (RSC prop or `/api/config`).
- For server code, replace `process.env.FOO` with `env.FOO` from the module above (centralizes validation and reads).

### 5) Clean up `.env.*`
- In **`apps/merchant` runtime** (or repo root if that’s where your Next.js reads from), ensure the **non‑public** names exist:  
  - Example: change `NEXT_PUBLIC_API_BASE_URL=...` → `API_BASE_URL=...`
- Keep `.env.development` & `.env.production` aligned with the new names. Document changes in the report.

### 6) Build & typecheck & test (merchant only)
Run the following (capture output into the report):
```bash
pnpm build --filter merchant
pnpm -C apps/merchant typecheck || tsc -p apps/merchant/tsconfig.json --noEmit
pnpm -C apps/merchant test || echo "No test script"
```
If linting is configured:
```bash
pnpm -C apps/merchant lint || echo "No lint script"
```

### 7) Verify no env strings leak to client bundle
- After build, **scan the client output** for any env names/values (case‑insensitive where helpful):
  ```bash
  rg -n "NEXT_PUBLIC_" .next/ || true
  rg -n "(API_BASE_URL|AUTH_SECRET|YOUR_OTHER_KEYS)" .next/ || true
  rg -n "(https?://[^\\s\"']+)" .next/static || true
  ```
- Add results and interpretation to the report. There should be **no secrets** and **no `NEXT_PUBLIC_`** references remaining for values used by the app.

### 8) Git workflow
```bash
git checkout -b chore/merchant-env-server-only
git add -A
git commit -m "merchant: enforce server-only env usage; add validated env module; migrate client reads"
```
- Provide a short **diff summary** in the report (`git diff --stat` after staging/commit).
- If you created an API route or changed `.env.*`, document clearly.

---

## Acceptance Criteria

- `pnpm build --filter merchant` **succeeds**.
- **Zero** direct `process.env` reads in client/browser code.
- All env access in server paths goes through `src/lib/env.ts` with validation.
- No secrets or sensitive values present in the client bundle scan.
- `ENV_MIGRATION_REPORT.md` present and complete (inventory, changes, verification, build logs).

---

## Notes & Edge Cases

- If a third‑party lib expects a public key in browser (e.g., analytics), justify in the report. Provide a redactable proxy value if possible.
- If some client code used a base URL just to form fetch endpoints, switch to **relative paths** (preferred) or use `/api/*` routes to avoid exposing hostnames.
- Preserve behavior across environments (`development`, `production`). Use `.env.local` overrides if needed. Do not commit secrets.
- If Zod is unavailable in the workspace, install it in `apps/merchant` or implement a minimal runtime check with explicit error messages.

---

## Final Output Checklist

- [ ] `apps/merchant/src/lib/env.ts` created and used by all server code.
- [ ] All previous `NEXT_PUBLIC_` usages migrated; no client env reads remain.
- [ ] Optional `/app/api/config/route.ts` added if client truly needs a benign value.
- [ ] Build, typecheck, tests done; logs included in `ENV_MIGRATION_REPORT.md`.
- [ ] Client bundle scan shows no secrets and no `NEXT_PUBLIC_` references used by the app.
- [ ] PR-ready branch and commits with clear messages.

---

**Run now.** Apply the plan, make the changes, and produce the deliverables inside `apps/merchant`.
