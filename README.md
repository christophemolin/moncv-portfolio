# CV Portfolio — React + Vite + GitHub Pages

This repository contains a branded CV/portfolio for a Customer Service Director in VAT Taxation.

- Branding style guide: `STYLEGUIDE.md`
- Theme tokens (colors + typography): `src/styles/theme.css`
- Logo component (initials monogram): `src/components/Logo.jsx`
- Configurable content: `src/siteConfig.js`
- Starter layout: `src/App.jsx`

## Run locally

```bash
npm install
npm run dev
```

## Build for production (to /docs)

This project is configured to build into `/docs` and to work under the GitHub Pages project URL `/moncv-portfolio/`.

```bash
npm run build
```

The build output appears in `docs/`.

## Publish via GitHub Pages (main branch /docs folder)

1) Commit and push your latest changes (including the `docs` build):

```bash
npm run build
git add docs
git commit -m "build: publish docs for GitHub Pages"
git push
```

2) In GitHub → Repo → Settings → Pages:
- Build and deployment:
  - Source: Deploy from a branch
  - Branch: `main`
  - Folder: `/docs`
- Save

3) Your site will be live at:
- https://christophemolin.github.io/moncv-portfolio/

Note: It may take 1–2 minutes to update. Hard refresh with Ctrl/Cmd + Shift + R if cached.

## Why you saw 404 on assets (and how this fixes it)

Symptoms you saw:
- Requests were going to:
  - `https://christophemolin.github.io/assets/index-*.js` (404)
  - `https://christophemolin.github.io/assets/index-*.css` (404)

For a project page, assets must live under the repository subpath:
- Correct paths:
  - `https://christophemolin.github.io/moncv-portfolio/assets/index-*.js`
  - `https://christophemolin.github.io/moncv-portfolio/assets/index-*.css`

Root cause:
- The build was created without a proper base path, so asset URLs pointed to `/assets/...` at the domain root instead of `/moncv-portfolio/assets/...`.

Fixes already applied:
- `vite.config.js` now sets:
  - `base: "/moncv-portfolio/"`
  - `build.outDir: "docs"`
- `index.html` favicon path uses a relative URL: `vite.svg`
- Added `public/.nojekyll` to avoid GitHub Pages Jekyll processing.

Action you need to take:
- Run `npm run build`, commit the `docs` folder, push, and ensure GitHub Pages is configured to serve from `main` / `docs`.

Verification tip:
- After building, open `docs/index.html` and confirm asset URLs begin with `/moncv-portfolio/`, for example:
  - `<script type="module" crossorigin src="/moncv-portfolio/assets/index-XXXX.js"></script>`

## Customize

- Content (name, role, contact, sections): `src/siteConfig.js`
- Colors/typography/layout tokens: `src/styles/theme.css`
- Page title/description: `index.html`
- Logo style/size: `src/components/Logo.jsx` (change `size`, `strokeWidth`, or text style)

## Troubleshooting

- 404 on assets:
  - Ensure `vite.config.js` has `base: "/moncv-portfolio/"`.
  - Ensure GitHub Pages uses `main` / `docs`.
  - Re-run `npm run build`, commit and push `docs/`.
  - Hard-refresh the browser or try an incognito window.

- Favicon missing:
  - We use `vite.svg` in `public/`. Confirm it exists and that you rebuilt.

- SPA routing (if you add more routes later):
  - You can copy `docs/index.html` to `docs/404.html` after build to ensure client-side fallback routes on GitHub Pages.
