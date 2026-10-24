# Atharv Babu — Portfolio

The Play design: an animated portfolio using slate (#95a5a6), burnt orange (#df542f), and a paper background.

## Run locally

    npm install
    npm run dev

Open http://localhost:3000.

## Production

    npm run build
    npm start

Set NEXT_PUBLIC_SITE_URL to the full production URL when deploying to a different domain. It defaults to https://atharvbabu.netlify.app for social-preview URLs.

## Content and interactions

- Edit the page copy in app/page.tsx and project data in data/projects.ts.
- Drag the hero shapes, or use arrow keys when focused. Hold Shift for larger steps; Enter resets a shape.
- The motion preference is remembered and respects the device's reduced-motion setting.
- Project build notes expand to show technical details.
- Artwork is illustrative HTML/CSS/SVG. The favicon and social-preview image are generated from app/.

Only application source and configuration were copied from Portfolio-Play. Dependencies, build output, caches, Git metadata, and the destination .gitignore were not copied or replaced.
