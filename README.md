# Jafarullah Jafarul Haseena — Personal Portfolio

A fully responsive personal portfolio built with plain HTML, CSS and vanilla
JavaScript — no frameworks, no build step. Just open `index.html` in a
browser or upload the folder to any static host.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css        → theme, layout, components, animations
│   └── responsive.css   → tablet / mobile breakpoints
├── js/
│   └── script.js        → all interactivity (vanilla JS)
└── public/
    ├── profile.jpg       ← replace with your real photo
    ├── resume.pdf         ← placeholder PDF, replace with your real resume
    ├── favicon.ico         ← placeholder icon, replace if you like
    └── projects/
        ├── project1.jpg   ← add your real project screenshots here
        ├── project2.jpg
        ├── project3.jpg
        └── project4.jpg
```

## Before you publish

1. **Add your photo** — drop a square-ish image at `public/profile.jpg`.
   Until you do, the hero and about photos fall back to a yellow/grey
   placeholder automatically, so the site never breaks.
2. **Add your resume** — replace `public/resume.pdf` with your real resume
   (same filename, so the "Download Resume" buttons keep working).
3. **Add project images** — drop screenshots into `public/projects/` named
   `project1.jpg` … `project4.jpg`, or update the `src` paths in
   `index.html` and the `projectData` array in `js/script.js` if you use
   different filenames.
4. **Update project details** — edit the `projectData` array near the top
   of the Portfolio section logic in `js/script.js` (titles, descriptions,
   GitHub links, live demo links).
5. **Fill in placeholders** — the Resume section has an internship entry
   marked `(Add your internship details here.)`; the Contact section uses
   a placeholder email address (`jafarhaseena@example.com`) — update both
   with your real details.

## Features included

- Sticky navbar that goes translucent + blurred on scroll, with scroll-spy
  active-link highlighting
- Typing animation in the hero, animated counters, progress bars and
  circular skill meters (all driven by IntersectionObserver, so they only
  animate once visible)
- Filterable portfolio grid with a details modal per project
- Auto-sliding testimonials carousel (pauses on hover)
- Contact form that opens WhatsApp (`wa.me`) with the message pre-filled,
  correctly URL-encoded via `encodeURIComponent`
- Custom cursor on desktop (auto-disabled on touch devices)
- Loading screen, ripple button effect, scroll-to-top button, mobile
  hamburger menu
- Respects `prefers-reduced-motion` and keeps visible keyboard focus states

## WhatsApp number

Currently set to `+94 77 929 9696` (`94779299696` in `js/script.js`,
`WHATSAPP_NUMBER` constant). Update it there if it ever changes.
