# Members CMS — Spec

**Date:** 2026-10-09
**Author:** Jioh In
**Status:** Draft

---

## 1. Goal

Admins manage the `/about/members` board roster from the admin panel. They create a board for each academic year, add, edit and reorder its members, and publish it. Board data moves out of the hard-coded frontend file `src/features/about-page/data/memberPageData.ts` into the backend (`KISA-website-server`). Changes appear on the public page without a redeploy.

The admin hub groups website content management under one **Website CMS** entry. It holds the existing main banner admin and the new members admin.

## 2. Board Years

A board year is one academic year's board, such as 26-27.

| Field | Format |
|---|---|
| Start year | A four-digit year, such as `2026`. Unique. It identifies the board year. |
| Label | Derived from the start year: `2026` gives `26-27`. Not stored or edited. |
| Published | Yes or no. |

- **Ordering:** board years sort by start year, newest first, everywhere.
- **Public default:** the public page opens on the newest published board year.

Actions:

| Action | Applies to | Effect |
|---|---|---|
| Create | — | The admin picks a start year that has no board year yet. The new board year is unpublished. It is empty, or optionally a copy of every entry of an existing board year, keeping each entry's fields, tier and order. |
| Publish | unpublished | The board year appears on the public page. |
| Unpublish | published | After a confirmation dialog, the board year disappears from the public page. |
| Delete | unpublished | After a confirmation dialog, deletes the board year and all of its entries. A published board year must be unpublished first. |

Edits to entries in a published board year appear on the public page immediately.

## 3. Board Entries

An entry is one person on one board year's roster. It is a standalone record, not linked to a website user account.

| Field | Required | Format |
|---|---|---|
| Name | yes | Plain text, one line. |
| Major | yes | Plain text, one line. |
| Class year | yes | Graduation year, such as `2027`. Shown as "Class of 2027". |
| Roles | yes, at least one | A list of free-text role labels, such as `Event Planning` or `Event Planning Lead/Finance`. Shown as badges. |
| Lead | no | Marks a sub-team lead. |
| Tier | yes | `president` or `member`. |
| Position | — | Order within the entry's tier in its board year (section 4). |
| Created by / updated by | — | Admin emails, taken from the auth token. |
| Created at / updated at | — | Timestamps. |

The same person in two board years is two separate entries.

### President badge

A president-tier entry's badge reads **VICE PRESIDENT** if its first role contains "vice" (case-insensitive), and **PRESIDENT** otherwise. This is the current page's rule.

## 4. Ordering

- **Stored position:** each entry has a position within its tier in its board year.
- **New entries:** an added entry goes to the end of its tier. An entry whose tier changes on edit moves to the end of the new tier.
- **Admin controls:** admins reorder entries within a tier by drag-and-drop or with up/down buttons on each row, as on the main banner admin's Live tab. Both change only the order shown on screen.
  - **Save order** and **Discard** appear when the on-screen order differs from the stored order. Save order sends the whole order of the board year in one request.
- **Conflict check:** the save-order request carries the board year's full set of entry IDs. If that set no longer matches the database, the backend responds `409`. The admin page then shows an "entries changed" message and reloads the board year.
- **Concurrent edits:** edits to the same entry are last-write-wins.

## 5. Backend (`KISA-website-server`)

- **Branch:** `admin/members-cms`, cut from `main`, merged through a pull request.
- **Schema:** new tables added to `queries/supabase_schema.sql` and applied in Supabase. Entries are deleted with their board year.
- **Public endpoint:**
  - read published board years with their entries, in stored order.
- **Admin endpoints,** all `@admin_required`:
  - list all board years, including unpublished, with their entries
  - create a board year, optionally copied from an existing one
  - publish
  - unpublish
  - delete an unpublished board year
  - create an entry
  - update an entry
  - delete an entry
  - save order, which returns `409` on a stale set of entry IDs
- **Tests:** pytest coverage for the routes.
- **Seed:** a one-time seed loads the three board years in `memberPageData.ts` (25-26, 24-25, 23-24; 89 entries) as published board years.
  - `presidents` become president-tier entries.
  - `operations` followed by `public_relations` become member-tier entries.
  - File order becomes position. Roles and `isLead` carry over as they are.

## 6. Public Page (`/about/members`)

- **Data:** the page fetches published board years from the public endpoint on the server, on every request.
- **Look and behavior:** unchanged.
  - The heading reads "{label} Board".
  - A year dropdown lists published board years, newest first, defaulting to the newest.
  - President-tier entries render as the elevated president row.
  - Member-tier entries render in one grid in stored order, with the people count.
- **Request failure:** the page shows the design system's `StatusView` error state with a retry.
- **No published board years:** the page shows a short empty-state message in place of the dropdown and roster.
- **Removal:** `src/features/about-page/data/memberPageData.ts` is deleted.

## 7. Admin UI

- **Wording:** Korean copy calls the board roster 멤버.

### Admin hub (`/admin`)

- In `src/components/layout/admin/AdminHubCards.tsx`, the "Main Banner" card becomes a **Website CMS** card linking to `/admin/website`. The hub keeps five cards.

### Website CMS (`/admin/website`)

- A card grid in the admin hub's card style, with two cards:
  - **Main Banner** → `/admin/website/carousel`. The main banner admin itself is unchanged.
  - **Members** → `/admin/website/members`.

### Back navigation

- From a Website CMS section (`/admin/website/carousel`, `/admin/website/members`), the back-to-hub button returns to `/admin/website`.
- From `/admin/website`, it returns to `/admin`.

### `/admin/website/members`

- **Board year picker:** lists every board year, newest first, each marked published or unpublished.
  - **New board year:** asks for a start year (only years without a board year) and, optionally, an existing board year to copy from.
- **Board year actions:**
  - **Publish:** one button, on an unpublished board year.
  - **Unpublish:** on a published board year, with a confirmation dialog.
  - **Delete:** on an unpublished board year, with a confirmation dialog.
- **Preview:** renders the selected board year with the public page's own president and member cards, whether published or not.
- **Entry list:** president-tier entries first, then member-tier entries.
  - **Rows:** each row has the name, major and class year, role badges, the lead mark, "edited by … · date", and Edit and Delete actions.
  - **Ordering controls:** described in section 4.
  - **Add member** button.
- **Dialogs:**
  - **Add / Edit:** the entry form, with name, major, class year, roles, lead and tier.
    - **Roles input:** a tag-style input. It suggests labels already used in the selected board year and the board year before it, and accepts new labels.
  - **Delete entry:** a confirmation.
- **Unsaved changes:** closing the Add / Edit dialog with unsaved changes asks for confirmation.

Visual design is done with pastiche.

## 8. Delivery

1. **Server PR** (section 5) on `admin/members-cms` in `KISA-website-server`. After merge:
   - the schema is applied in Supabase
   - the seed runs
   - the server is deployed
2. **Client PR** on `admin/members-cms` in this repo.
   - **Contents:** the Website CMS hub card and `/admin/website` page, the back-navigation change, the members admin page, and the public page reading from the backend. It also deletes `memberPageData.ts`.
   - **Prerequisite:** PR 1 deployed and seeded.

Admins create the 26-27 board year through the members admin after the client PR deploys.
