<!-- WISDOM — atom-intrinsic rules. Hand-curated. -->
<!-- Format: `- [Tag1,Tag2,...] rule text.` (comma-separated tags inside one bracket pair). -->
<!-- Tags must match FACT.md atom names verbatim. `[GENERAL]` is the lone non-FACT tag — system-wide invariants. -->
<!-- Discipline: only atom-intrinsic rules here. Scenario-conditional rules belong in KNOWLEDGE. -->

- [GENERAL] Every color references a DS semantic token (e.g. `--color-brand-primary`, `--color-surface`, `--color-foreground`); never raw hex and never `--primitive-*` directly.
- [GENERAL] Every typographic decision uses a `.type-*` class paired with an explicit color token; no ad-hoc `font-size` or `font-weight`.
- [GENERAL] Gaps and padding come from the named spacing tiers (`element` 8px / `component` 16px / `section` 24px); no arbitrary spacing values.
- [GENERAL] Radius comes from `rounded-md` / `rounded-lg` / `rounded-full`; off-tier radii require explicit DS-surface justification.
- [GENERAL] Use only the `default` / `md:` / `lg:` breakpoints; no `sm:` / `xl:` / `2xl:` and no arbitrary media queries. Vertical spacing does not scale across breakpoints.
- [GENERAL] Depth is flat: no shadow utilities; carry depth with `--color-border` plus surface tonal layers (`surface` / `surface-muted` / `surface-subtle`), two levels maximum.
- [GENERAL] No dark mode: no `.dark`, no dark-scheme media queries, no dark layer.
- [GENERAL] Accessibility floors: semantic HTML by default, visible focus via `--color-focus-ring`, and every icon-only control carries an accessible name.
