# Personal Branding Style Guide
Role: Customer Service Director — VAT Taxation

This guide defines the visual identity for a professional portfolio/CV focused on VAT customer service leadership. It balances trust, precision, and modernity.

## 1) Brand Positioning
- Attributes: Trustworthy, precise, efficient, people-first, regulatory-savvy, enterprise-ready
- Voice & Tone: Clear, concise, confident, data-driven, solution-oriented

## 2) Logo (Modern Initials Monogram)
- Concept: A clean monogram circle with the initials centered, surrounded by an accent ring to signal focus and clarity.
- Default Initials: "AM" (edit in src/siteConfig.js)
- Construction:
  - Outer ring: 2px accent ring (#14B8A6)
  - Inner background: White on light mode, near-black on dark backgrounds if used
  - Initials: Bold geometric sans (Manrope), center aligned
- Safe Area: Maintain padding equal to 0.5× the logo height around the mark
- Minimum Size: 32px (web), 18mm (print)
- Variations:
  - Primary: Accent ring + neutral inner with dark text
  - Mono: All navy (#0F172A) for single-color contexts
- Misuse:
  - Don’t add additional effects (drop shadows, gradients) outside usage guidelines
  - Don’t warp, rotate, or stack extra text inside the token
  - Don’t place on low-contrast or busy backgrounds
- Accessibility:
  - Provide aria-label or alt text “Logo: AM” (or updated initials)
  - Maintain sufficient contrast between initials and background

## 3) Color Palette
Designed for clarity, high contrast, and professional feel typical of finance, compliance, and enterprise SaaS.

- Primary (Navy): #0F172A
  - Usage: Headings, primary text, icons
- Secondary (Slate): #475569
  - Usage: Body text, secondary UI, dividers
- Accent (Teal): #14B8A6
  - Usage: Highlights, links, badges, calls-to-action

Extended neutrals:
- Neutral 50: #F8FAFC
- Neutral 100: #F1F5F9
- Neutral 200: #E2E8F0
- Neutral 300: #CBD5E1
- Neutral 700: #334155
- Neutral 900: #0F172A

States:
- Accent Hover: #0D9488
- Focus Ring: 2px outline using accent with visible offset

Contrast guidance:
- Text should meet WCAG AA at minimum
- Use white (#FFFFFF) text on Accent (#14B8A6) when placed on buttons or chips

## 4) Typography
- Title Font: Manrope
  - Weights: 700–800
  - Style: Geometric, modern, friendly yet professional
- Body Font: Inter
  - Weights: 400–600
  - Style: Highly readable for dense content and tables

Scale:
- H1: 48/56 (–0.01em letter-spacing, 800 weight)
- H2: 32/40 (700)
- H3: 24/32 (700)
- Body: 16/24 (400–500)
- Small: 14/22 (400–500)
- Button: 14/16 (600, uppercase optional)

## 5) Layout & Spacing
- Container: 720–960px max width for CV page
- Grid: Single-column with clear sectioning and generous whitespace
- Spacing rhythm:
  - Section spacing: 40–56px
  - Block spacing: 16–24px
  - Inline spacing: 8–12px
- Corners: 10–14px for cards and badges
- Shadows (subtle):
  - Elevation 1: 0 1px 2px rgba(15, 23, 42, 0.06)
  - Elevation 2: 0 6px 16px rgba(15, 23, 42, 0.08)

## 6) Link & Button Styling
- Links: Accent color (#14B8A6), underline on hover, darker hover (#0D9488)
- Primary Button: Accent background, white text, rounded corners, focus ring visible

## 7) Content Guidelines (VAT Customer Service)
- Write concise impact statements with measurable outcomes (SLAs, NPS, resolution times, audit outcomes)
- Emphasize compliance, risk mitigation, cross-functional collaboration, and CX improvements
- Show toolkit (ERP/SAP, ticketing platforms, reporting suites)
- Report on KPIs (First Response Time, Average Handle Time, First Contact Resolution, SLA adherence)

## 8) Implementation Notes
Google Fonts:
- Manrope and Inter are loaded in index.html.

CSS Variables (see src/styles/theme.css):
- Color tokens: --color-primary, --color-secondary, --color-accent, neutrals
- Typography: --font-title, --font-body

Logo Component:
- See src/components/Logo.jsx
- Update initials via src/siteConfig.js

## 9) Quick Usage Snippets

HTML (fonts in <head>):
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&display=swap" rel="stylesheet">

CSS (variables excerpt):
:root {
  --color-primary: #0F172A;
  --color-secondary: #475569;
  --color-accent: #14B8A6;

  --color-neutral-50: #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-700: #334155;
  --color-neutral-900: #0F172A;

  --font-title: "Manrope", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  --font-body: "Inter", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

Component class names:
- .logo-token, .section, .badge, .tag, .container, .muted, .kpi

This guide is implemented in the project as variables and components for easy reuse.
