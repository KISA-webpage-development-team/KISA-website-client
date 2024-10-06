# KISA Website Frontend

## Tech Stacks

- **Framework**: NextJS (^14.2.4)
- **Styling**: TailwindCSS
- **UI Library**: NextUI + Aceternity UI | React-icons
- **State Management**: React Context API
- **HTTP Client**: Axios (^1.7.2) + SWR (^2.2.5)

## Getting Started

1. run following command to install necessary packages

`npm install`

2. run following command to start running server in localhost

`npm run dev` (with production backend) or
`npm run dev:local` (for local backend)

3. run following command to build the project and run the server

`npm run build && npm run start`

## Folder Structure (WIP)

### `public`

Contains all public assets like images and logos. Image name follows the format {id}.png

- `carousel` folder: Contains images for carousel in home page
- `events` folder: Contains images for events in events page (/about/events)
- `images` folder: Contains images for info pages (/info)
- `quick_links` folder: Contains images for quick links in home page
- `kisa_all.png`: KISA all photo (/about/kisa)

### `src`

Main project folder:

- `app`

  - `layout.js`: Global layout including header & footer
  - `page.js`: Home page
  - `[Page Name]` folders: Different pages with their own `page.js` and `layout.js` (/[Page Name])
  - `api`: NextJS API routes (/api)

- `components` (WIP)

- `apis`

  - `[API Name]` folders: API call services (backend connection) and data fetching functions (/apis/[API Name])
    - `mutations.ts`: Mutations for CRUD operations (POST, PUT, DELETE)
    - `queries.ts`: Queries for fetching data (GET)
    - `swrHooks.ts`: Custom SWR hooks for data fetching (GET)

- `lib`

  - `[Library Name]` folders: Reusable libraries for the project (/lib/[Library Name])

- `types`
  - `[Type Name]` folders: Reusable types for the project (/types/[Type Name]) (type name is mostly same as the "entity" name)
