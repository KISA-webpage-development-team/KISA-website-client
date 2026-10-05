# Home Carousel Admin — Spec

**Date:** 2026-10-05
**Author:** Jioh In
**Status:** Draft

---

## 1. Goal

Admins manage the home page featured carousel (`src/features/home/components/FeaturedCarousel.tsx`) from the admin panel: upload new items, edit them, reorder them, archive them, and remove them. Carousel items move out of hard-coded frontend data into the backend (`KISA-website-server`), with images in Cloudinary. Changes appear on the home page without a redeploy.

The backend table is the only source of carousel items. The Instagram auto-sync pipeline is retired.

## 2. Item Lifecycle

| Status | Meaning |
|---|---|
| live | Shown in the home page carousel. |
| archive | Kept in the database and listed in the admin panel as a reference for past carousel items. Not shown on the home page. |
| removed | Deleted for good: the database row and its Cloudinary image are both deleted. Not a stored status. |

- **Stored status:** the stored status is `live` or `archive`.
- **Effective status:** this is what both the home page and the admin panel use. An item is archive if its stored status is `archive`, or if it has an end date and that date has passed. Otherwise it is live. Effective status is derived when reading, and nothing is written back when an end date passes.
- **End date:** the item expires at the end of that day in `America/Detroit` time.

Actions:

| Action | Applies to | Effect |
|---|---|---|
| Create | — | New item, stored as `live`, placed by the end-date rule (section 4). |
| Edit | live and archive | Updates any field. Replacing the image deletes the old Cloudinary image. |
| Archive | live | Sets stored status to `archive`. |
| Restore | archive | Sets stored status to `live`, with a new end date or none. Placed by the end-date rule. |
| Use as template | archive | Opens the create form pre-filled with the archived item's title, description, link and image. Saving creates a new item, and the archived item is unchanged. |
| Remove | live and archive | Deletes the row and its Cloudinary image. |

## 3. Item Fields

| Field | Required | Format |
|---|---|---|
| Title | yes | Plain text, one line. |
| Description | yes | Restricted rich text: bold, italic, underline, line breaks. Stored as HTML. |
| Link | no | Absolute `http(s)` URL. Clicking the carousel image opens it in a new tab. If there is no link, the image is not clickable. |
| Image | yes | One image in Cloudinary. |
| End date | no | A date (see section 2). |
| Position | — | Order among live items (section 4). |
| Created by / updated by | — | Admin emails, taken from the auth token. |
| Created at / updated at | — | Timestamps. |
| Image reference | — | Cloudinary `public_id` and `version`. |

### Description formatting and sanitization

- **Editor:** a restricted Quill editor (`react-quill-new`). The toolbar has bold, italic and underline only.
- **Storage:** the backend stores the HTML the editor produces.
- **Rendering:** every place that renders the description (the home carousel, the admin carousel preview, the form slide preview) goes through one shared render helper. That helper runs `isomorphic-dompurify` with an allowlist of `p`, `br`, `strong`, `em`, `u` and no attributes.

## 4. Ordering

- **Stored position:** each live item has one.
- **End-date rule:** soonest end date first. Items with no end date come after all dated items, newest first among themselves.
- **Placement:** created and restored items are inserted where the end-date rule puts them among the current live items. After that, the stored position is the order, and nothing re-sorts it automatically.
- **Admin controls:** admins reorder live items by drag-and-drop (framer-motion `Reorder`) or with up/down buttons on each row. Both change only the order shown on screen.
  - **Reset to date order** re-sorts the on-screen order by the end-date rule.
  - **Save order** and **Discard** appear when the on-screen order differs from the stored order. Save order sends the whole order in one request.
- **Conflict check:** the save-order request carries the full set of live item IDs. If that set no longer matches the database, the backend responds `409`. The admin page then shows a "live items changed" message and reloads the list.
- **Concurrent edits:** edits to the same item are last-write-wins.
- **Soft limit:** more than 6 live items shows an inline warning on the Live tab. Saving is never blocked.

## 5. Images

- **Accepted files:** JPEG, PNG or WebP, up to about 10 MB.
- **Upload:** the browser uploads to Cloudinary `temp/` through the existing Next.js Cloudinary routes (section 9, PR 1b). On save, the backend renames the image to `carousel/item-{id}` and stores its `public_id` and `version`.
- **Cancel:** cancelling a form deletes its temp upload. Temp uploads left behind by a closed tab are not cleaned up.
- **Replace:** replacing an image on edit deletes the previous Cloudinary image.
- **Use as template:** if the admin keeps the archived item's image, the backend copies it to the new item's own `carousel/item-{id}` on save. The admin can also remove that image and upload a new one. Every image belongs to exactly one item.
- **Serving:** the public read returns a ready image URL that includes the version, with Cloudinary automatic format and quality (`f_auto,q_auto`) at the carousel's display width.
- **Framing:** there is no crop tooling. The carousel image frame is 3:2 with `object-cover`, and the form shows a live preview of that crop. Framing the image is the designer's job.

## 6. Backend (`KISA-website-server`)

- **Branch:** `admin/home-carousel`, cut from `main`.
- **Schema:** a new table added to `queries/supabase_schema.sql` and applied in Supabase.
- **Public endpoint:**
  - read live items: effective status live, in stored order, with image URLs ready to use.
- **Admin endpoints,** all `@admin_required`:
  - list all items, including archive
  - create
  - update
  - archive
  - restore
  - remove
  - save order, which returns `409` on a stale set of live IDs
- **Cloudinary operations:** rename from `temp/`, copy for use as template, delete on replace and remove. They build on `server/api/pocha/image_helpers.py`.
- **Tests:** pytest coverage for the routes.

## 7. Home Page

- `src/app/(main)/page.tsx` fetches live items from the public endpoint on the server, on every request, and passes them to `FeaturedCarousel`.
- If there are no live items, or the request fails, the carousel is hidden and the page starts at `BoardsPreview`. The public carousel's look and behavior are otherwise unchanged.

## 8. Admin UI

- **Admin hub:** in `src/components/layout/admin/AdminHubCards.tsx`, the "Website CMS" coming-soon card becomes a live "Home Carousel" card with Korean subtext. It links to `/admin/website/carousel`. The hub keeps five cards.

### `/admin/website/carousel`

- **Header:** page title and a **New item** button.
- **Carousel preview, at the top:** the real `FeaturedCarousel` in an admin mode, rendering the live items.
  - **Order:** it follows the on-screen order, including unsaved reorders, and shows an "Unsaved order" badge until Save order or Discard.
  - **Slide actions:** the shown slide offers **Edit**, **Archive**, **Remove** and **Open link**.
  - **Rotation:** pauses while the pointer or keyboard focus is inside the preview, and resumes on leaving. Clicking a pagination bar jumps to that slide and pauses there. Clicking the image selects the slide instead of opening the link.
  - **Public page:** the home page renders `FeaturedCarousel` without admin mode.
  - **Empty:** when no item is live, the preview area shows the empty state: "No live items. The home page carousel is currently hidden.", with a New item button.
- **Live and Archive tabs:**
  - **Live tab:**
    - **Rows:** each row has a thumbnail, title, end date or "No end date", "edited by … · date", and Edit, Archive and Remove actions.
    - **Ordering controls:** described in section 4.
    - **Soft-limit warning:** shown above 6 live items.
  - **Archive tab:**
    - **List:** sorted by most recently archived or expired, with a title search box that filters in the browser over the full archive list, loaded once.
    - **Rows:** each row has Restore, Use as template, Edit and Remove actions.
- **Dialogs:**
  - **Restore:** asks for a new end date or none.
  - **Remove:** a confirmation.
  - **Archiving or removing the last live item:** the confirmation also says the home page carousel will be hidden.

### Form pages

- **Routes:**
  - `/admin/website/carousel/new`
  - `/admin/website/carousel/[id]/edit`
  - `/admin/website/carousel/new?from={id}`, for use as template
- **Layout:** the form is on the left. A live preview of the full slide is on the right, using the same slide markup as the home carousel so title and description clipping match. On mobile the two stack.
- **Unsaved changes:** leaving with unsaved changes asks for confirmation.

Visual design is done with pastiche.

## 9. Delivery

The work ships as five PRs, in this order:

1. **Close existing holes.** These two go in parallel.
   - **1a. Server PR: Pocha admin auth.** `POST /api/v2/pocha/` and `PUT /api/v2/pocha/<pochaid>/` (`server/api/pocha/info.py`) switch from `@token_required` plus a check of the request-body `email` against `admins` to `@admin_required`. The PR confirms that the client's Pocha create and update calls send the bearer token. It has its own branch off `main` and deploys on its own.
   - **1b. Client PR: Cloudinary route auth.** `src/app/api/upload-to-cloudinary/route.ts`, `src/app/api/delete-from-cloudinary/route.ts` and `src/app/api/sign-cloudinary-params/route.ts` verify the bearer token and confirm admin status through the backend's `GET /auth/isAdmin/:email`. Anything else is rejected.
2. **Server PR: carousel backend** (section 6). After merge, the schema is applied in Supabase and the server is deployed.
3. **Client PR: carousel feature.**
   - **Contents:** the admin hub card, the admin page and form pages, `FeaturedCarousel` admin mode, and the home page reading from the backend. It also deletes the hard-coded carousel data in `src/features/home/data/homePageData.tsx`.
   - **Prerequisites:** PR 2 deployed and PR 1b merged.
4. **Client PR: legacy cleanup.** Deletes:
   - `.github/workflows/instagram-sync.yml`
   - `scripts/insta-to-carousel/`
   - the `insta:*` scripts in `package.json`
   - `docs/insta2carousel.md`
   - `public/carousel/` (all 21 files)
   - `src/features/home-sponsor/data/homePageData.js`
   - the `scontent-icn2-1.cdninstagram.com` entry in `next.config.js` `remotePatterns`

The carousel database starts empty. Admins create the first live items right after PR 3 deploys.

## 10. Manual Follow-ups Outside the Repos

- Delete the `origin/instagram-sync` remote branch.
- Delete the GitHub Actions secrets `RAPIDAPI_INSTAGRAM_KEY`, `RAPIDAPI_INSTAGRAM_HOST` and `OPENAI_API_KEY`.
