# KISA Website

## USER-PAGE BRANCH

: /users api를 사용하는 모든 페이지들을 추가

## Getting Started

1. run following command to install necessary packages

`npm install`

2. run following command to start running server in localhost

`npm run dev`

## Folder Structure

### `public`

: this folder contains all the public images like logo

### `src`

: main project folder

- `app`
  - `layout.js` : global layout of the website including header & footer
  - `page.js` : home page
  - `[Page Name]` folders : include different pages with their own `page.js` and `layout.js` files
  - `api` folder : include all the NextJS API routes
- `components`
  - `shared` folder: Stores all the shared components along different pages
  - `ui` folder: Stores all the UI components used in the website
  - `[Page Name]` folder: Stores different components in each page
- `config`
  : this folder stores different configurations such as google login and backend connection
- `context`
  : different react contexts such as global state management and authentication
- `utils`
  - `fonts` folder: Stores all the fonts used in the website
  - `helpers` folder: Stores all the helper functions used in the website
- `service`
  : Stores all the API call services used in the website`

### other files

- `jsconfig.json`
  : javascript compiler configuration file
- `next.config.js`
  : next js compiler configuration file
- `package.json`
  : package information + npm scripts
- `postcss.config.js`
  : css configuration file
- `tailwind.config.js`
  : tailiwindcss configuration file, you can set custom tailwind css keywork here
