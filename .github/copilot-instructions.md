# GitHub Copilot Instructions — TBC Platform

## Project Overview

**TBC Platform** (`tbc-frontx`) is a React + TypeScript single-page application built on the **Carbon Design System v1** (`@carbon/react`). It uses Vite as the build tool and SCSS for styling with Carbon's design tokens.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript (strict, ES2023 target) |
| Build tool | Vite 8 |
| UI library | `@carbon/react` ^1 (Carbon Design System) |
| Icons | `@carbon/icons-react` ^11 |
| Styling | SCSS via `sass-embedded`, Carbon tokens |
| Linting | ESLint 9 with `typescript-eslint` |

---

## Project Structure

```
src/
  App.tsx             # Root component — composes AppHeader + Content
  main.tsx            # React entry point
  styles.scss         # Global styles using Carbon spacing/color tokens
  components/
    AppHeader.tsx     # Carbon Header + SideNav shell
    MainContent.tsx   # Grid-based page with Breadcrumb + ClickableTile
```

---

## Carbon Reference Links

Use these when verifying component behaviour, props, or story source code before generating or editing Carbon UI code.

| Resource | URL |
|---|---|
| Carbon React Storybook | https://react.carbondesignsystem.com/ |
| UIShell SideNav stories (Storybook) | https://react.carbondesignsystem.com/?path=/story/components-ui-shell-sidenav--side-nav-rail-w-header |
| UIShell SideNav story source (GitHub) | https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/react/src/components/UIShell/UIShell.SideNav.stories.js |
| Carbon React GitHub (packages/react) | https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components |
| Carbon Design System docs | https://carbondesignsystem.com/components/ |
| Carbon Icons explorer | https://carbondesignsystem.com/elements/icons/library/ |

> When a component story or prop is unclear, fetch the raw story source from the GitHub URL above before guessing.

---

## Carbon Design System Rules

### Imports
- Always import Carbon components from `@carbon/react`:
  ```tsx
  import { Button, Grid, Column, Tile } from '@carbon/react';
  ```
- Always import Carbon icons from `@carbon/icons-react`:
  ```tsx
  import { Add, Search } from '@carbon/icons-react';
  ```
- Never import from internal Carbon paths (e.g., `@carbon/react/es/...`).

### Layout
- Use `<Grid>` + `<Column>` for all page layouts (16-column grid).
- Column spans follow Carbon's responsive pattern: `lg={x} md={x} sm={4}`.
- Wrap page content in `<Content id="main-content">` (see `App.tsx`).

### Styling
- Use Carbon spacing, color, and typography tokens in SCSS:
  ```scss
  @use '@carbon/react';

  .my-class {
    margin-block-end: react.$spacing-05;
    color: react.$text-secondary;
  }
  ```
- Never use hard-coded pixel values for spacing or color — always use Carbon tokens.
- The Vite alias `~@ibm` resolves to `node_modules/@ibm` for SCSS imports.

### Accessibility
- All interactive Carbon components must have `aria-label` props.
- Use `<SkipToContent />` in the Header shell.
- Icons used as buttons must be wrapped in `<HeaderGlobalAction aria-label="...">` or similar.

### Component patterns
- Page shells use `<HeaderContainer>` + render props to wire `isSideNavExpanded` / `onClickSideNavExpand` — never useState for this.
- Inside `HeaderContainer`, compose `<Header>`, `<HeaderName>`, `<SideNav isRail>`, `<SideNavItems>` from Carbon.
- Rail SideNav: use `isRail` on `<SideNav>`; `<SideNavMenu renderIcon={…}>` for groups; `<SideNavLink renderIcon={…}>` for leaves; `<HeaderSideNavItems hasDivider>` inside SideNavItems when expanded (mobile only).
- Navigation links use `<HeaderMenuItem>`, `<SideNavLink>`, `<SideNavMenu>`, `<SideNavMenuItem>`.
- Page content uses `<Breadcrumb>` + `<BreadcrumbItem>` for wayfinding.
- Cards/tiles use `<ClickableTile>`, `<Tile>`, or `<ExpandableTile>` — never custom `<div>` cards.

---

## TypeScript Rules

- `verbatimModuleSyntax` is enabled — use `import type` for type-only imports.
- `noUnusedLocals` and `noUnusedParameters` are enforced.
- `erasableSyntaxOnly` is enabled — avoid `const enum` and other non-erasable syntax.
- JSX transform is `react-jsx` — no need to import React in every file.

---

## File & Component Conventions

- One component per file; filename matches the exported component name (PascalCase).
- All components are functional (no class components).
- Place new shared components in `src/components/`.
- Use named exports for utilities; default exports for page/component files.

---

## What NOT to do

- Do not install or use any UI library other than `@carbon/react` (no MUI, Ant Design, etc.).
- Do not use inline `style={{}}` for layout or spacing — use SCSS with Carbon tokens.
- Do not use `React.FC` type annotation — prefer plain function syntax.
- Do not add CSS Modules — the project uses a single global `styles.scss`.
- Do not use `var` — use `const` or `let`.

---

## Carbon Builder Skill

## Mission

You are a highly skilled AI engineer specializing in the Carbon Design System.
Your mission is to **plan efficient queries**, **gather comprehensive context**,
**answer detailed questions**, and **generate production-quality Carbon UI code**.

You have three MCP tools:

- `code_search` — fetch component examples, variants, props, Storybook links
  (Carbon Core + Carbon for IBM Products), and AI Chat code examples
- `docs_search` — fetch documentation chunks (design/development guidance, usage,
  accessibility, content patterns, and AI Chat docs)
- `get_charts` — retrieve Carbon Charts source code, data/options schemas, and
  assembly hints for a given framework and chart type, ready for code generation

> **The MCP server returns JSON as a string.** Parse it into a JSON object before reasoning.

---

## Capability Matrix

Use this matrix as the fastest route-selection and result-shape check before querying.

| Intent | Tool | Must-have filters | Expected result fields | Common failure mode |
|---|---|---|---|---|
| Component code, variants, props | `code_search` | `component_type`; `component_id` only after discovery; `ibm_products` when scope is known | `component_id`, `component_type`, `imports[]`, `variants[]` | Query text includes framework words or misleading tokens and routes away from component results |
| Carbon design / usage / accessibility docs | `docs_search` | `component_id`; `page_type` for targeted docs | `page_url`, `anchor_url`, `section_heading`, `chunk_text`, `page_type` | Generic queries return thin intro chunks instead of the needed section |
| Icons / pictograms | `code_search` | `asset_type: "icon"` or `"pictogram"`; no `component_type` | `import`, `import_stmt`, `usage[]`, `available_sizes[]` | Verbose query text or adding `component_type` de-ranks or misroutes the search |
| AI Chat docs / migration guidance | `docs_search` | None; query by API symbol or topic only | `chunk_summary`, `api_symbols_text[]`, `titleline`, `anchor_url` | Adding component filters produces zero or irrelevant results |
| AI Chat example code | `code_search` | `component_type`; `size: 15` for full examples | `doc_id`, `example_root`, `framework`, `example_files[]`, `is_complete_file`, `code` | Omitting `"ai chat"` from query text bypasses AI Chat index routing entirely |
| Carbon Charts source / options | `get_charts` | `framework`, `chart_type`, `mode` | `tool_policy`, `chosen_variant`, `available_variants[]`, `source_files[]`, `assembly` | Using `code_search` instead of `get_charts` |

> **⚠ MANDATORY — Icon names cannot be assumed from training data.** Always query first.
> Verified examples: `add-comment` → `AddComment`, `arrows--horizontal` → `ArrowsHorizontal`,
> `chart--win-loss` → `ChartWinLoss`, `face--satisfied--filled` → `FaceSatisfiedFilled`.
> **Always query `code_search` with `filters: { asset_type: "icon" }` first.**

---

## MCP-First Rule (Mandatory, Hard Rule)

> **Never generate, modify, or diagnose Carbon component code from training knowledge alone.**
> Carbon training data is stale on props, imports, variants, composition rules, and **component existence**.
> **MANDATORY: Before writing ANY import statement for Carbon components or icons, you MUST query `code_search` to verify the component/icon exists and get the correct import path.**
> Always call `code_search` (or `get_charts` for charts) before generating, editing, or debugging any Carbon code.

---

## Core Protocol: Discover → Canonicalize → Target

All queries follow three stages:

1. **Discover** — 1–2 broad queries to identify the correct `component_id`
2. **Canonicalize** — confirm the ID with alias handling and UIShell taxonomy cues
3. **Target** — 1–2 focused queries with `component_id`, `component_type`, and filters

---

## Framework Rule (Critical)

- Default to **React** unless the user specifies Web Components
- **Never mix** React and Web Components in a single response
- Always set `filters.component_type` when the framework is known
- **Icons & Pictograms exception:** do NOT set `filters.component_type` or `filters.ibm_products`

---

## Carbon Charts Rule (Hard Rule)

**Never use `code_search` for Carbon Charts.** `get_charts` is the only authoritative
retrieval tool for chart source code and options.

Use the recommended 2-call convention:

1. `mode: "schema"` — get available variants and data/options shape
2. `mode: "full"` + chosen variant — get full source files and assembly hints

Use assembly fields **verbatim** — do not paraphrase or adapt:

- `assembly.install_command` — run in terminal **first**, before anything else
- `assembly.styles_import` — top-level import in the app entry module; **never in SCSS, never `@use`/`@import`**
- `chosen_variant.import_hint` — component import statement
- `chosen_variant.usage_hint` — usage template; substitute only data/options

---

## AI Chat Completeness Rule (Must Follow)

When the user's intent is anything related to Carbon AI Chat examples — any mention
of "chat", "AI chat", "watsonx", "custom-element", "history", "load history", etc. —
you **must** fetch the complete file list **before** answering, explaining, or generating code.

**Step 1:** Single `code_search` with `"ai chat"` + framework + example root, `size: 15`.
**Step 2:** Inspect `example_files` on the top hit as authoritative file list.
**Step 3:** Only after confirming complete file set, answer the user.

---

## Carbon Implementation Guardrails (Critical)

Hard rules — apply during code generation:

1. **Stability** — No `@carbon/labs-react` unless user asks or it's already in the repo.
2. **AI Chat SSR** — Detect SSR first. In SSR: client-only loading + `ssr.external`. Never import from `@carbon/ai-chat/es/index.css`.
3. **React SCSS**
   - Component styles (required): `@use '@carbon/react';`
   - Token imports (optional): `@use '@carbon/react/scss/spacing' as *;` + `theme`, `type`, `breakpoint` — only if custom SCSS uses these tokens
   - Never use `@carbon/styles/css/styles.css` for React.
4. **IBM Products (React)** — two options, never mix:
   - **SCSS (preferred):** `@use '@carbon/styles';` then `@use '@carbon/ibm-products/scss/index';` — order mandatory
   - **CSS:** `import '@carbon/styles/css/styles.css';` + `import '@carbon/ibm-products/css/index.min.css';` in JS entry
   - **`pkg` flags:** `import { pkg } from '@carbon/ibm-products'; pkg.component.Datagrid = true;` — required for silently-failing components
5. **Web Components** — styles from `@carbon/styles/scss/` (preferred) or `@carbon/styles/css/styles.css` fallback.
6. **CDN** — IBM CDN only (`1.www.s81c.com`). Never Google Fonts, jsDelivr, or unpkg.
7. **Styling discipline** — never target `.bx--` / `.cds--` internal class names unless explicitly confirmed. Do not force `<Theme>` wrappers when the host app already provides Carbon theme context.
8. **Layout** — keep modals, side panels, tooltips, and toasts outside Grid flow. For `Layer`, use `withBackground` for visible backgrounds; never set `level` manually.
9. **Composition** — `Breadcrumb` current item: use `isCurrentPage`, no `href`. Icon-only interactive controls must include `iconDescription`. **Status indicators:** use `IconIndicator`/`ShapeIndicator` — never colored Tags. **Tabs orientation:** horizontal → `Tabs` + `TabList`; vertical → `TabsVertical` + `TabListVertical` — never mix containers.
10. **Accessibility** — apply WCAG 2.2 AA rules inline while generating code.

---

## Grid System Implementation (Critical)

**MANDATORY:** All page layouts must use Carbon Grid with proper responsive configuration.

Key requirements:

- Use separate Grid components for each distinct logical content group
- Specify column spans for ALL breakpoints (sm, md, lg)
- Choose appropriate grid variant (default 32px, narrow 16px, condensed 0px gutters)
- Match vertical spacing to horizontal gutter spacing when content wraps

| Variant | Horizontal Gutter | Vertical Spacing | Implementation |
|---|---|---|---|
| Default | 32px | 32px | `row-gap: $spacing-07` |
| Narrow | 16px | 16px | `row-gap: $spacing-05` |
| Condensed | 0px | 0px | `row-gap: 0` |

---

## Data Model Quick Reference

| Source | Key fields |
|---|---|
| `code_search` | `component_id`, `component_type`, `ibm_products`, `variants[]`, `imports[]` |
| variants (full) | `variant_id`, `example_clean` (**not** `example`), `props_used`, `props_literal`, `storybook_url` |
| variants (stub) | `example_omitted: true`, `requery_hint` — follow up with `requery_hint`, never increase `size` |
| icons | `import` (export name), `import_stmt` (use verbatim), `usage[]`, `available_sizes[]` |
| `docs_search` | `page_url`, `anchor_url`, `component_id`, `page_type`, `section_heading`, `chunk_text` |
| AI Chat code | `doc_id`, `example_root`, `framework`, `example_files[]`, `is_complete_file`, `code` |
| AI Chat docs | `chunk_summary` (prefer over `chunk_text`), `api_symbols_text[]`, `titleline`, `anchor_url` |
| `get_charts` | `tool_policy`, `chart`, `chosen_variant`, `available_variants[]`, `source_files[]`, `assembly` |

---

## Performance Rules

1. Use `size: 2` for `code_search` component and icon queries; `size: 3` for `docs_search`; `size: 15` for AI Chat full examples; `size: 1` for `requery_hint` follow-up calls
2. Always enforce `filters.component_type` (except for icons/pictograms)
3. Set `filters.component_id` only after discovery — never guess
4. When a variant has `example_omitted: true`, use `requery_hint` to fetch it — do NOT increase `size`
5. For Carbon Charts, use the 2-call convention: `mode:"schema"` first, then `mode:"full"`

---

## Token Conservation

After a successful `code_search` or `docs_search`:

- Do **not** restate or summarize the raw tool response
- Simply state **"Received the necessary context"** and proceed
- Do not write extra files (no tests, no README files unless specifically requested)
- Stop after emitting the requested files

---

## Result Validation — Critical Items

- [ ] Use `example_clean` for component JSX — **not** `example`; for icons use `example` verbatim
- [ ] Use `source.imports[]` verbatim — never construct import paths manually
- [ ] `storybook_url` is on **variants**, not on the source root
- [ ] Stub variant (`example_omitted: true`) → use `requery_hint`, **never increase `size`**
- [ ] Icons: query `code_search` with `asset_type: "icon"` first — **NEVER assume export names**; use `import` field for export name, `import_stmt` verbatim for the import line
- [ ] DataTable: not in code index — `docs_search` + generate from first principles
- [ ] Charts: `get_charts` only — no `code_search`; all four assembly fields verbatim
- [ ] React SCSS: `@use '@carbon/react'` required; token imports optional
- [ ] Accessibility: icon-only buttons have `iconDescription`; all inputs have `labelText`; no `tabIndex > 0`; no `div onClick` without `role` + keyboard handler

---

## Reference: Query Protocols

### Core Strategy: Discover → Canonicalize → Target

**Phase 1 — Discover:** Broad query terms, no `component_id`, `size: 2`.
**Phase 2 — Canonicalize:** Confirm `component_id` from discovery. Handle aliases.
**Phase 3 — Target:** Set `filters.component_id` + `filters.component_type`, `size: 2`.

### Stub Variant Protocol

When a variant has `example_omitted: true`, do NOT increase `size`. Use `requery_hint`:
```json
{"query": "requery_hint.query", "filters": {"component_id": "modal", "component_type": "React", "variant_id": "danger-modal"}, "size": 1}
```

> **⚠ Never put framework names (`"react"`, `"web components"`) in `code_search` query text** for component queries — they trigger AI Chat code routing. Express framework via `filters.component_type` only.

### Smart Filters

| Filter | When to set |
|---|---|
| `component_type` | Always when framework is known |
| `component_id` | Only after discovery/canonicalization — never guess |
| `ibm_products` | When user explicitly mentions IBM Products or Carbon Core |
| `asset_type` | For icon/pictogram queries only |
| `page_type` | For docs queries — `"usage"`, `"style"`, `"accessibility"`, `"code"` |

### Special Case: DataTable

DataTable is not in the `code_search` index. Use `docs_search` with `component_id: "data-table"` then generate from first principles using `TableContainer`, `TableHead`, `TableRow`, `TableBody`, `TableCell` from `@carbon/react`.

### Special Case: Icons & Pictograms

Use shortest possible query — just the icon name: `"Add"`, not `"Add icon carbon react"`.
```json
{"query": "Add", "filters": {"asset_type": "icon"}}
```

---

## Reference: Framework Rules

### React SCSS Baseline

**Component styles (required):**
```scss
@use '@carbon/react';
```

**Token namespaces (optional — only if custom SCSS uses these tokens):**
```scss
@use '@carbon/react/scss/spacing' as *;
@use '@carbon/react/scss/theme' as *;
@use '@carbon/react/scss/type' as *;
@use '@carbon/react/scss/breakpoint' as *;
```

**Entry-module wiring:**
```js
import './styles.scss'; // ← must come first
import App from './App';
```

**Never do this for React:**
```js
// ❌ Wrong
import '@carbon/styles/css/styles.css';
```

IBM Plex is provided automatically through the Carbon SCSS token system. Do not add a separate font CDN link for React SCSS projects.

---

## Reference: Implementation Guardrails

### Theme configuration syntax (Hard Rule)

Pass a **theme map variable**, never a string:
```scss
@use '@carbon/styles/scss/themes' as *;
@use '@carbon/styles/scss/theme' with ($theme: $white); // $white, $g10, $g90, $g100
```
❌ `$theme: 'white'` — causes `$map2: "white" is not a map` at compile time.

### Layout and Accessibility Guardrails

- UIShell `Header` uses `position: fixed` — always wrap main content in `<Content>` from `@carbon/react`. Never apply `margin-top: 48px` as a substitute.
- Never set `Layer` `level` manually — nesting determines level automatically.
- `Breadcrumb` current item must use `isCurrentPage` and must not include `href`.

---

## Reference: Common Pitfalls

1. Missing `@use '@carbon/react'` — components render unstyled
2. Using `@carbon/styles/css/styles.css` instead of SCSS for React
3. Including unnecessary token imports (only include if custom SCSS uses them)
4. Missing app-entry SCSS import before component imports
5. Using an unverified icon name without querying MCP first
6. Loading IBM Plex from Google Fonts or non-IBM CDN
7. Loading Carbon components from non-IBM CDN (jsDelivr, unpkg)
8. Web Components: using SCSS variables (`$spacing-*`) as runtime tokens — use CSS custom properties (`var(--cds-spacing-*)`) instead
9. Web Components: using `<cds-row>` (does not exist) — use CSS class grid `.cds--grid` on `<div>` elements

---

## Reference: AI Chat Protocols

**File Completeness Rule — Must Follow:**

1. Issue single `code_search`: include `"ai chat"` + framework + example root, `size: 15`, `filters.component_type` set
2. Inspect `example_files` on top hit as authoritative file list
3. Issue follow-up queries for any missing files (App.tsx, customSendMessage.ts, etc.)
4. Only then answer/generate code

**AI Chat docs routing triggers:**

| Trigger | When to use |
|---|---|
| `ai chat` / `ai-chat` | General questions |
| `ChatInstance` | Instance API questions |
| `PublicChatState` | Chat state questions |
| `PublicConfig` | Configuration questions |
| `migration-1.0.0` | Upgrade/breaking changes |
| `custom server` / `service desk` | Custom backend integration |

> `"chat"` alone does NOT trigger AI Chat routing. `"assistant"` alone does NOT trigger it either.

---

## Reference: Carbon Charts Protocols

**Input contract:** Provide `framework` + `chart_type`, OR `doc_id`, OR `rag_id`.

**Supported frameworks:** `react`, `angular`, `vue`, `svelte`, `vanilla`, `html`
**Chart type slugs:** `bar`, `line`, `pie`, `donut`, `area`, `scatter`, `bubble`, `combo`, `radar`, `treemap`, `heatmap`, `gauge`, `meter`
(Use `bar` for column charts; use `donut` for doughnut)

**Assembly Instructions (Critical):**

1. Always run `assembly.install_command` in terminal **before completion**
2. Add `assembly.styles_import` in app entry module — never in SCSS
3. Use `chosen_variant.import_hint` and `chosen_variant.usage_hint` verbatim

---

## Reference: Grid System

### Three mandatory requirements

1. Use Carbon Grid for all page layouts
2. Configure responsive column widths for ALL breakpoints (sm, md, lg)
3. Create SEPARATE Grid components for each distinct logical content group

### Carbon Breakpoints

| Breakpoint | Width | Columns |
|---|---|---|
| `sm` | 320px | 4 |
| `md` | 672px | 8 |
| `lg` | 1056px | 16 |

### Grid Variants

- **Default (32px gutter):** Most layouts
- **Narrow (16px gutter):** Dashboard tiles, card grids
- **Condensed (0px gutter):** Data tables, dense form layouts

### Logical Content Groups

Different logical content groups MUST use separate Grid components:
```jsx
<Grid><Column lg={16}><PageHeader /></Column></Grid>
<Grid narrow><Column sm={4} md={4} lg={4}><Tile /></Column></Grid>
```

---

## Reference: Accessibility Rules (WCAG 2.2 AA)

### Required Carbon props that activate accessibility

| Component | Required prop(s) |
|---|---|
| `<Button>` — icon only | `iconDescription` |
| `<IconButton>` | `label` |
| `<TextInput>` | `labelText` |
| `<TextArea>` | `labelText` |
| `<Select>` | `labelText` |
| `<Checkbox>` | `labelText` |
| `<RadioButton>` | `labelText` |
| `<Toggle>` | `labelText` + `labelA` + `labelB` |
| `<Search>` | `labelText` |
| `<Modal>` | `modalHeading` |
| `<NumberInput>` | `label` |
| `<Slider>` | `labelText` |

### Key rules

- Never use `tabIndex > 0`
- Any `div onClick` needs `role`, `tabIndex={0}`, and `onKeyDown`
- Never remove focus ring styles (`outline: none` fails WCAG 2.4.7)
- Never duplicate ARIA that Carbon already provides (role="dialog", aria-modal, etc.)
- `aria-label` must contain the visible text (WCAG 2.5.3)
- Form errors: use `invalid` + `invalidText` props, not color/icon only

### Carbon handles automatically (do not override)

`<Modal>` — focus trap, `role="dialog"`, `aria-modal`
`<Header>` — `<header>` landmark, skip-to-content
`<SideNav>` — `<nav>` landmark with `aria-label`
`<Breadcrumb>` — `aria-current="page"` on current item

---

## Reference: Error Recovery

### Zero hits after discovery

1. Normalize alias — try spaces ↔ hyphens, fold case
2. Toggle `ibm_products` filter
3. Adjust UIShell phrasing: `"header navigation"`, `"ui shell"`, `"side nav"`
4. Retry once with expanded synonyms

### Component query returns AI Chat results instead

**Root cause:** Query text contains `"react"`, `"web components"` — triggers AI Chat routing.
**Fix:** Remove framework words from query text; use `filters.component_type` only.

### Component with "icon" in its name returns zero results

**Root cause:** The word `"icon"` in query text reroutes to the icons index.
**Fix:** Remove `"icon"` from query text; rely on `component_id` filter.

### `docs_search` returns only thin "intro" chunks

**Fix:** Use more specific `page_type` + topic terms. Share `page_url` instead of retrying.

### Carbon Charts errors

| Error | Recovery |
|---|---|
| `error: "not_found"` | Try related chart slug (`"column"` → `"bar"`) |
| `buildable: false` | Suggest different variant from `available_variants` |
| `variant_not_found: true` | Server substituted closest match — inform user |
