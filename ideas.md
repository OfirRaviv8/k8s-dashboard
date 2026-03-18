# K8s Dashboard — Design Ideas

## Approach 1: "Operational Dark" — Industrial Precision
<response>
<text>
**Design Movement:** Dark-mode industrial dashboard, inspired by Grafana + Linear
**Core Principles:**
1. High information density without visual clutter
2. Monochromatic slate base with electric-blue accent
3. Sharp edges, minimal border-radius
4. Data-first hierarchy — numbers and status badges lead

**Color Philosophy:** Near-black backgrounds (`oklch(0.12 0.01 260)`) with electric blue (`oklch(0.6 0.22 255)`) accents. Status colors: green for healthy, amber for warning, red for critical. Muted slate for secondary text.

**Layout Paradigm:** Fixed 240px sidebar, full-height. Header 56px. Content area scrollable. Sidebar items use left-border indicator for active state.

**Signature Elements:**
- Monospace font for resource counts and IDs
- Thin horizontal rules between sections
- Status dot indicators (pulsing for live data)

**Interaction Philosophy:** Instant feedback. Hover states reveal secondary actions. Active states use left-border highlight.

**Animation:** Subtle fade-in for page transitions (150ms). Counter animations for metrics. No decorative motion.

**Typography System:** `JetBrains Mono` for data/IDs, `Inter` for UI labels (but with tight tracking)
</text>
<probability>0.08</probability>
</response>

## Approach 2: "Clean Slate" — Enterprise Light Mode
<response>
<text>
**Design Movement:** Enterprise SaaS, inspired by Datadog + Vercel dashboard
**Core Principles:**
1. Light background, high contrast text
2. Card-based layout with soft shadows
3. Blue-grey palette — professional, trustworthy
4. Sidebar with icon + label navigation

**Color Philosophy:** White/near-white backgrounds, slate-700 text. Primary blue (`oklch(0.55 0.2 255)`) for interactive elements. Sidebar slightly off-white (`oklch(0.97 0.005 260)`).

**Layout Paradigm:** 256px sidebar with logo at top, nav items with icons, user profile at bottom. Header with breadcrumb + actions. Main content uses 24px grid gap.

**Signature Elements:**
- Pill badges for status (Running/Pending/Failed)
- Metric cards with trend indicators
- Collapsible sidebar groups

**Interaction Philosophy:** Familiar SaaS patterns. Breadcrumb navigation. Hover backgrounds on nav items.

**Animation:** Page fade (100ms). Skeleton loaders for async content.

**Typography System:** `DM Sans` for headings, system-ui for body text
</text>
<probability>0.07</probability>
</response>

## Approach 3: "Midnight Ops" — Deep Dark with Teal Accent ✅ CHOSEN
<response>
<text>
**Design Movement:** Modern DevOps tooling, inspired by Lens IDE + Warp terminal
**Core Principles:**
1. Deep dark background with layered depth (sidebar darker than content)
2. Teal/cyan accent for primary actions and active states
3. Monospace elements for technical data
4. Compact, dense layout — operators prefer information density

**Color Philosophy:** Background `oklch(0.13 0.015 240)`, sidebar `oklch(0.10 0.012 240)`, cards `oklch(0.17 0.012 240)`. Teal accent `oklch(0.72 0.14 195)`. Text: near-white for primary, muted blue-grey for secondary.

**Layout Paradigm:** 220px fixed sidebar, 60px header. Sidebar has icon-only collapse mode. Content area with responsive grid.

**Signature Elements:**
- Teal left-border on active nav items
- Monospace font for resource names and counts
- Subtle grid/dot pattern on header background

**Interaction Philosophy:** Keyboard-friendly. Hover reveals details. Active states are unmistakable.

**Animation:** Slide-in for sidebar items (staggered 30ms). Fade for page content. Pulse for live indicators.

**Typography System:** `Space Grotesk` for headings/nav, `JetBrains Mono` for data values
</text>
<probability>0.06</probability>
</response>

---
**Selected: Approach 3 — "Midnight Ops"**
