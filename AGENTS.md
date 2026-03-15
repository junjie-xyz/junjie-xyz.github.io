# Repository Guidelines

## Project Structure & Module Organization

This repository is a static personal site built from `src/` with Gulp. Edit source files in `src/` only.

- `src/index.html` and `src/music.html`: source pages
- `src/manifest.json`: PWA manifest source
- `src/assets/`: source images and icons
- `index.html`, `music.html`, `manifest.json`, `assets/`: generated output written by the build
- `gulpfile.js`: build and local dev workflow

Do not hand-edit generated files in the repository root unless you are intentionally patching build output.

## Build, Test, and Development Commands

- `pnpm install`: install dependencies
- `pnpm run dev`: build from `src/`, start BrowserSync, and serve the site locally
- `pnpm run build`: minify HTML/JSON and copy assets into the repository root

Use `pnpm run build` before opening a PR to ensure generated files match the source.

## Coding Style & Naming Conventions

Use simple, static-first HTML/CSS/JS. The existing codebase uses:

- 2-space indentation
- single quotes in JavaScript
- semicolon-free JavaScript style
- lowercase, hyphen-free page names such as `music.html`

Prefer small, direct changes over new tooling or abstractions. Keep asset names descriptive and lowercase, for example `avatar.jpg` or `icon-192x192.png`.

## Testing Guidelines

There is no automated test suite configured in this repository. Validation is manual:

- run `pnpm run dev` and verify both pages load correctly
- run `pnpm run build` and confirm generated root files update without errors
- check responsive layout, icon paths, and manifest behavior after UI changes

If you add JavaScript behavior, include clear reproduction and verification steps in the PR.

## Commit & Pull Request Guidelines

Recent history uses short commits like `feat: refresh personal site copy and layout` and `feat: upgrade node 24 and simplify gulp build`. Follow that pattern:

- prefer Conventional Commit prefixes such as `feat:`, `fix:`, and `chore:`
- keep the subject concise and action-oriented

Pull requests should include a short summary, impacted pages or assets, manual test notes, and screenshots for visible UI changes.
