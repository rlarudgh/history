# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Astro Portfolio Site**
  - Landing page with Hero, About summary, Projects preview, Contact CTA sections
  - About page with profile, skills, work experience, education, certifications
  - Projects listing page with hashtag filtering
  - Project detail pages using MDX Content Collections
  - Contact page with email, phone, GitHub, LinkedIn links

- **Styling & UI**
  - Tailwind CSS v4 with custom color palette (slate + blue)
  - Responsive design for mobile/tablet/desktop
  - AOS (Animate On Scroll) animations
  - Project cards with hover effects
  - TechBadge component with brand icons via simple-icons

- **Dark Mode**
  - System preference auto-detection (`prefers-color-scheme`)
  - Manual toggle button in header (sun/moon icons)
  - localStorage persistence
  - FOUC prevention with inline `<head>` script
  - Full dark theme coverage across all pages and components

- **Content Management**
  - Astro Content Collections with Zod schema validation
  - MDX support for project detail pages
  - Sample projects: E-commerce Renewal, Mobile Banking
  - Category-based filtering (웹/앱/서버)

- **Development Environment**
  - Husky Git hooks (pre-commit, commit-msg)
  - Commitlint with Conventional Commits rules
  - Biome for linting and formatting (2 spaces, single quotes, LF)
  - Playwright E2E tests with 4 test suites
  - GitHub Actions CI/CD workflows
  - Modular CI scripts (lint.sh, build.sh, test-e2e.sh, run-all.sh)

- **Documentation**
  - `AGENTS.md` - Project overview, tech stack, conventions
  - `PRD.md` - Product requirements and data models
  - `SKILLS.md` - Detailed technology descriptions
  - `.claude/rules/*.md` - AI coding assistant rules (Astro, Tailwind, a11y, etc.)
  - `.claude/commands/*` - Custom CLI commands for component/test generation

### Changed

- **Refactored `.claude/` directory**
  - Removed Next.js/Zustand/FSD-specific rules
  - Added Astro-specific component and Tailwind usage guidelines
  - Updated review agent for static site context
  - Fixed commit command scope detection for Astro project structure

### Fixed

- Biome v2 configuration compatibility (migrated from legacy options)
- Astro file unused variable false positives (added override config)
- Tailwind CSS `@plugin` directive parsing in Biome
- Simple-icons import path deprecation (`simple-icons/icons` → `simple-icons`)

[Unreleased]: https://github.com/username/portfolio-history/compare/HEAD
