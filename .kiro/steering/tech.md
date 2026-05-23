# Tech Stack

- React 16 (class components — no hooks used in this codebase)
- React Router v5 with HashRouter (required for GitHub Pages compatibility)
- Bootstrap 3.4 (vendored in `public/bootstrap 3.4/`, loaded via `public/index.html`)
- react-switch for toggle UI
- Create React App (react-scripts 5) — no eject

## Common Commands

```bash
npm start        # dev server at http://localhost:3000
npm test         # run tests (watch mode)
npm run build    # production build
npm run deploy   # build + deploy to GitHub Pages via gh-pages
```

## Notes

- No TypeScript — plain JavaScript (.js) throughout
- No state management library (Redux, etc.) — component state only
- Animation is done with `setTimeout` loops and direct DOM class manipulation (not React state) for performance
- `src/Constraint.js` holds the public URL constant
