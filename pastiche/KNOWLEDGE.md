<!-- KNOWLEDGE — scenario → atom mappings. Hand-curated. -->
<!-- Per scenario: prose framing line(s), then one or more `→ <atom expression>` lines. -->
<!-- Atom names backticked — FACT entries verbatim. Never derived utility forms or untracked Tailwind (those belong as WISDOM `[GENERAL]` rules). Prop expressions bare. -->
<!-- Multi-arrow scenarios allowed; LLM parses scenario boundaries semantically. -->
<!-- All 12 H2 sections required (lint enforces). Empty stubs are OK. -->

## Action buttons

The one dominant action on a screen (submit, confirm, "Buy ticket"). Navy brand emphasis; at most one per view.
→ `Button` variant="primary"

The lower-emphasis companion to a primary CTA (Cancel beside Save, "Learn more").
→ `Button` variant="secondary"

The quietest button, for in-context or repeated actions where even secondary is too loud.
→ `Button` variant="tertiary"

Destructive action — delete, remove, revoke. Carries the error palette.
→ `Button` variant="destructive"

Navigation styled as a button — routes via `href`, not onClick.
→ `LinkButton` variant="primary" href
→ `LinkButton` variant="secondary" href

Compact action with no text label (toolbar, table row); requires an `aria-label`.
→ `IconButton` icon aria-label variant="tertiary"

The submit control inside a DS `Form`, auto-disabled while the form is invalid.
→ `Form.Button` disableWhenInvalid

Loading / pending action — DS Button has no `loading` prop, so disable it and pair an inline spinner during async work.
→ `Button` disabled + `LoadingSpinner` size="sm"

## Forms & input collection

Single-line text in a form (name, email) — bound to react-hook-form.
→ `Form.Input` name label rules
Standalone, outside a DS Form — wrap a raw control with field chrome.
→ `FormItem` label error + `Input` invalid

Multi-line text — descriptions, messages.
→ `Form.Textarea` name label
→ standalone: `Textarea` invalid

Single-select dropdown — pick one from many (long lists).
→ `Form.Select` name label + `SelectTrigger` + `SelectContent` + `SelectItem`
→ standalone: `Select` + `SelectTrigger` placeholder + `SelectItem`

Single choice from a few visible options — radio group.
→ `Form.Radio` name label + `RadioItem`
→ standalone: `RadioGroup` invalid + `RadioItem`

Multi-select — choose several; there is no multi-`Select`, so use a toggle group or a checkbox set.
→ `ToggleGroup` type="multiple"
→ checkbox set: `Form.Checkbox` name label (one per option)

Boolean — consent/agreement checkbox vs. instant-apply setting toggle.
→ `Form.Checkbox` name label
→ `Form.Switch` name label
→ standalone instant setting: `Switch` text

Date or range pick inside a form (detailed pickers live in Date & time selection).
→ `Form.DatePicker` name label
→ `Form.DateRangePicker` name label

File upload — image/document with async upload + remove handlers.
→ `FileUpload` value onChange onUpload onRemove accept

Inline validation — field-level error messaging; controls flip to error styling.
→ `Form.Input` rules
→ standalone: `Input` invalid + `FormItem` error

Submit / cancel pair — primary submit gated on validity, secondary cancel.
→ `Form.Button` disableWhenInvalid + `Button` variant="secondary"

## Feedback & status

Transient confirmation — fire-and-forget success after an action ("Saved"). Mount the host once at root; fire per-event.
→ `Toaster`
→ inline alternative: `Alert` variant="success" title

Inline / banner error — a recoverable error attached to a region or form.
→ `Alert` variant="error" title

Full-page status takeover — error, not-found, not-authorized, not-logged-in as a whole screen.
→ `StatusView` variant="error" code title description action
→ `StatusView` variant="not-found" title description action

Warning — non-blocking caution before a risky path.
→ `Alert` variant="warning" title

Informational note — neutral context callout (distinct from a link).
→ `Alert` variant="info" title

Loading, indeterminate spinner — optionally full-screen.
→ `LoadingSpinner` size fullScreen

Loading, content-shaped placeholder while data streams in.
→ `Skeleton` variant="rectangular"
→ `Skeleton` variant="circular"

Empty state — a region with no data yet, with a recovery action.
→ `StatusView` variant="not-found" title description action

Auth / permission states — gated content the user can't see.
→ `StatusView` variant="not-authorized"
→ `StatusView` variant="not-logged-in"

Status label / count — inline pill marking state on an item.
→ `Badge` variant="success"
→ `Badge` variant="warning"
→ `Badge` variant="error"
→ `Badge` variant="info"

## Overlays

Informational modal — present content/detail in a focused overlay; dismiss is the only action.
→ `Dialog` + `DialogContent` size + `DialogTitle` + `DialogDescription`

Confirmation modal — confirm/cancel a non-destructive action.
→ `DialogContent` + `DialogFooter` + `Button` variant="primary" + `Button` variant="secondary"

Destructive confirmation — confirm a delete/revoke; the confirm button carries the error palette.
→ `DialogContent` + `DialogFooter` + `Button` variant="destructive" + `Button` variant="secondary"

Slide-over / drawer — side or bottom panel (mobile menus, filter trays, detail peeks).
→ `Sheet` + `SheetContent` + `SheetTitle` + `SheetFooter`

Contextual action menu — a list of actions anchored to a trigger (row "⋯", account menu).
→ `Dropdown` + `DropdownTrigger` + `DropdownContent` + `DropdownItem`
→ destructive entry: `DropdownItem` variant="destructive"

Rich popover — non-menu floating content anchored to a trigger (filter form, color picker).
→ `Popover` + `PopoverTrigger` + `PopoverContent`

Tooltip — short hint on hover/focus; the required label for icon-only buttons.
→ `Tooltip` content side

## Navigation & wayfinding

In-page tab switching — segment a view into panels (underline default, pill for compact).
→ `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` variant="underline"
→ `Tabs` variant="pill"

Pagination — page through a long result set.
→ `Pagination` page totalPages onPageChange

Segmented view switcher — toggle between mutually-exclusive view modes (grid/list, day/week).
→ `ToggleGroup` type="single"

Back / cancel — return without committing.
→ `IconButton` icon="arrow-left" aria-label
→ `LinkButton` variant="tertiary" href
→ `Button` variant="tertiary"

Account / overflow nav menu — anchored menu of navigation destinations.
→ `Dropdown` + `DropdownTrigger` + `DropdownItem`

Primary / secondary nav links — no dedicated nav atom; compose links as quiet buttons.
→ `LinkButton` variant="tertiary" href

Breadcrumb has no DS atom; build by hand if a trail is required.

## Content display

Data table — tabular records on desktop, with the DS's built-in mobile fallback.
→ `Table` + `TableHeader` + `TableBody` + `TableRow` + `TableHead` + `TableCell`
→ mobile: `TableMobileList` + `TableMobileItem`

Card — a self-contained content block with optional header/footer.
→ `Card` + `CardHeader` + `CardTitle` + `CardDescription` + `CardContent` + `CardFooter`
→ clickable card: `Card` hoverable

Card grid — responsive grid of cards.
→ `Grid` columns + `Card` hoverable

Compact list — dense stacked rows divided by hairlines.
→ row items + `Divider`

Rich list item — row with identity + metadata + status.
→ `Avatar` + `Badge`

Expandable sections / FAQ — collapsible disclosure groups.
→ `Accordion` + `AccordionItem` + `AccordionTrigger` + `AccordionContent`

Entity identity — person/org avatar with name fallback.
→ `Avatar` size src name

Detail view — a single record's full read view, composed from Card + the type ramp + dividers.
→ `Card` + `CardHeader` + `CardContent` + `Divider`

No DS media/image atom; images go through `next/image` directly.

## Layout & page structure

Page shell / container widths — the centered, responsively-padded page wrapper. Never hand-compose `mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8`.
→ `Container` size as

Responsive grid — multi-column reflow with named gap tiers.
→ `Grid` columns gap="component"

Page header — page title + primary action row at the top of a view.
→ `Container` + `.type-h1` + `Button` variant="primary"

Section header — heading that opens a content section, optionally over a rule.
→ `.type-h2` + `Divider`

Main / detail split — two-pane layout (list + detail, content + aside).
→ `Container` + `Grid` columns

Sidebar — no dedicated atom; desktop = a grid column, mobile = a drawer.
→ desktop: `Grid` columns
→ mobile: `Sheet` + `SheetContent`

Footer — page foot via the semantic `as` prop.
→ `Container` as="footer"

Section separation — visual/structural breaks between blocks.
→ `Divider`
→ spacing: `Grid` gap="section"

Mobile-only gate — render a view only on small screens, with a fallback message otherwise.
→ `OnlyMobileView` message

## Date & time selection

Single date pick — popover calendar bound to a single value.
→ `DatePicker` value onChange
→ in a form: `Form.DatePicker` name label

Date range pick — start/end selection.
→ `DateRangePicker` value onChange
→ in a form: `Form.DateRangePicker` name label

Inline calendar — always-visible month grid (not popover-triggered).
→ `Calendar`

Time pick — no DS time-picker atom; compose a native input or a select of slots.
→ `Input` (type="time")
→ `Select` + `SelectItem`

Relative date display — "3 days ago", "in 2 weeks"; rendered text, not an input.
→ `date-fns` formatting + `.type-body-sm` / `.type-caption` (no DS atom)

## Iconography

Decorative icon — paired with adjacent text, no standalone meaning (omit `label`, effectively aria-hidden).
→ `Icon` name size

Action icon — clickable affordance; needs an accessible name.
→ `IconButton` icon aria-label variant

Standalone informational icon — conveys meaning on its own, so it needs a `label`.
→ `Icon` name size label

Status icon — inline state glyph (success/warning/error).
→ `Icon` name="circle-check" label
→ `Icon` name="triangle-alert" label
→ `Icon` name="circle-x" label

Icon within feedback components — the icon slot on alerts and status views.
→ `Alert` icon
→ `StatusView` icon

Brand mark — social/brand glyphs (footer, contact).
→ `Icon` name="github"
→ `Icon` name="instagram"
→ `Icon` name="linkedin"

## Visual hierarchy

Hero / page title — the single largest title; one per page.
→ `.type-display`
→ app page title: `.type-h1`

Section / subsection heading.
→ `.type-h2`
→ `.type-h3`
→ inline heading: `.type-h4`

Body text — primary vs. dense/supporting.
→ `.type-body`
→ `.type-body-sm`

Label — form labels and call-out captions (medium weight).
→ `.type-label`

Caption / helper / error text — 12px metadata floor.
→ `.type-caption`

Muted / secondary text — genuinely secondary content; pair a type class with the muted color.
→ `.type-body-sm` + `--color-muted-foreground`

Emphasized text — emphasis comes from a heavier type class or color, never a `!font-*` override.
→ `.type-label`
→ `--color-foreground`
→ `--color-brand-primary`

Numeric / metric display — a prominent figure with a quiet label.
→ `.type-display` / `.type-h2` (figure) + `.type-caption` (label)

## Domain-specific patterns

Intentionally left empty. Product-specific flows (Pocha ordering, bulletin board, events) compose from the scenarios above; add entries here only when a recurring composition earns its own mapping.

## Brand Identity

KISA is the University of Michigan Korean International Student
Association. The audience is a Korean-speaking student community
plus the broader UMich population, and the design system carries
two non-negotiable identity anchors:

- **Michigan brand colors** — navy `brand-primary` and maize
  `brand-accent`, used sparingly to mark hierarchy and primary action.
- **Korean-first typography** — SejongHospital Bold for hero and
  page-title copy, Pretendard Variable for everything below.

The visual feel is institutional, calm, and high-contrast. The
language is flat, not skeuomorphic — borders and tonal layers carry
depth, never shadows. Spacing is generous on the section axis and
tight on the element axis, so groups read as groups without
scrolling. Brand color is reserved for sparse placement (navbars,
hero, primary CTAs); the body of the page is dominated by neutrals
and the Korean-first type ramp.
