---
name: Portfolio redesign decisions
description: Key design and routing decisions for Zaki Fahrizal's portfolio at artifacts/portfolio
---

**Theme**: White/light palette (CSS custom properties), primary=blue-600 (hsl 221 83% 53%). Replaced dark cyan/Bebas Neue theme entirely in `src/index.css`.

**Routing**: wouter `<Router base={import.meta.env.BASE_URL}>` with 4 routes: `/`, `/projects`, `/skills`, `/experience`. Pages in `src/pages/`.

**Photo**: `@assets/WhatsApp_Image_2026-06-17_at_06.19.22-removebg-preview_1781705108735.png` — transparent PNG, displayed in hero with `object-contain object-bottom` in a rounded-2xl container.

**Why minimal animations**: User asked for no heavy animations — kept framer-motion for subtle whileInView fadeUp only.

**How to apply**: Navbar uses `<Link>` from wouter; active state detected via `useLocation()`. No anchor-based scroll nav.
