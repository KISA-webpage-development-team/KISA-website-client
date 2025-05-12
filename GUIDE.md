# Ulitmate Guide on KISA-WEB Client Project Structure

This is a documentation dedicated to explain `src` folder structure of the repository.

## 1. Overview

```
src/
├── apis/       : async functions for direct api calls using axios/swr
├── app/        : next.js app router folder (page, layout, error, template, etc)
├── assets/     : static assets for the project (mostly fonts)
├── components/ : shared ui components (layout, button, icon, etc)
├── deprecated-components/
├── features/   : features of the project (bulletin board, pocha, etc)
├── lib/        : third party libraries-direct logics
├── types/      : type definitions
├── utils/      : utility functions
├── middleware.ts

```

## 2. Detailed Structure

### 2.1. apis/

This folder contains async functions for direct api calls using axios/swr.

```
src/apis/
├── auth
|---- queries.ts
├── boards
|---- queries.ts
|---- mutations.ts
|---- swrHooks.ts
├── comments
├── images
└── ...
```

All codes for **"direct" communication with the backend** are managed here. No API calls should be made outside this folder.

#### Background Knowledge

- **Entity**: It is the unit of data that makes up the business logic. Think of it as the representative classes used in the app. (e.g., User, Post, Comment, etc.)
- **Axios**: It is an HTTP client library. It provides easy-to-use functions and features for communicating with the backend. [Reference link](https://velog.io/@ahnboks/Ajax-Axios-%EA%B7%B8%EB%A6%AC%EA%B3%A0-fetch%EC%9D%98-%EC%82%AC%EC%9A%A9%EB%B2%95-%EB%B0%8F-%EC%B0%A8%EC%9D%B4%EC%A0%90)
- **SWR**: It is a library that makes data fetching easy. While data fetching is possible with Axios alone, using SWR allows for data caching, real-time maintenance of data, etc. **KISA-Web does not use additional features of SWR. It is just code that is no different from axios.** It is code added for scalability, so you don't have to worry about it. [Reference link](https://swr.vercel.app/)

#### Subfolder Naming

The name of the folder should match the first path element of the API Endpoint (= Entity name).

(e.g., /api/v1/users -> /src/apis/users)

#### File Explanation

For each Entity folder, there are up to three files as follows.

#### 1. `queries.ts`

Defines the GET API call functions for the corresponding Entity. Axios is used here.

#### 2. `swrHooks.ts`

Defines the GET API call functions for the corresponding Entity. SWR is used here. It is defined as a React Custom Hook called use-something, not a general async function. The usage is self-explanatory.

#### 3. `mutations.ts`

Defines the POST, PUT, DELETE API call functions for the corresponding Entity. Axios is used here.

---

### 2.2. app/

This folder contains the Next.js app router code.

```
src/app/
├── auth/
├── boards/
└── ...
```

Please read carefully the [Next.js App Router Documentation](https://nextjs.org/docs/app/getting-started/layouts-and-pages).

---

### 2.3. assets/

This folder contains custom fonts (Sejonghosptial) for the project.

---

### 2.4. components/

This folder contains **shared** UI components (layout, button, icon, etc).

```
src/components/
├── layout/
|-----header/
|-----footer/
└── ui/
|-----button/
|-----icon/
|-----input/
|-----modal/

```

Right now, there are two subfolders: `layout` and `ui`.

- `layout` contains layout components (header, footer, etc).
- `ui` contains UI components (button, icon, input, modal, etc).

---

### 2.5. deprecated-components/

This folder contains deprecated components.

> [!WARNING]
> This folder should be removed after resolving dependencies. Still, there are some components using these deprecated components.

```
src/deprecated-components/
└── shared/
└── ui/
```

---

### 2.6. features/

Our project is organized using a **feature-based directory structure**, which simplifies navigation and improves modularity by grouping related components, contexts, hooks, and data under dedicated feature folders.

#### Why Feature-based Structure?

Traditional directory structures often separate files by type, like `/components`, `/contexts`, `/hooks`, and `/data`. While this is clear, it can become unwieldy as a project grows. Finding everything related to a specific feature might require jumping across multiple folders.

To address this, we adopt a **feature-based structure**. Each feature is encapsulated within its own directory, containing everything it needs to function:

- `components`: UI components specific to the feature
- `contexts`: Context Providers and hooks for state management
- `hooks`: Custom hooks that are specific to the feature
- `data`: Static data, API calls, or data management logic

This approach allows each feature to be developed and understood in isolation, improving scalability and reducing dependency conflicts.

#### Directory Layout

Below is an example of our structure:

```
features
├── about-page
│   ├── components
│   ├── contexts
│   └── hooks
│
├── bulletin-board
│   ├── components
│   ├── contexts
│   └── hooks
│
├── home-sponsor
│   ├── components
│   └── data
│
├── info-page
│   ├── components
│   └── data
│
├── pocha
│
└── users
```

#### Example: `features/bulletin-board`

- `components`: Contains the UI elements for displaying posts, buttons, and forms. They are even separated into subfolders like `board`, `comment`, `post-delete`, etc.
- `contexts`: Manages global state specific to the bulletin board (e.g., comment related states).
- `hooks`: Custom hooks for API interactions or data fetching.

#### Benefits of this Approach

1. **Isolation:** Each feature is isolated, minimizing side effects.
2. **Scalability:** Adding new features does not disrupt the existing structure.
3. **Maintainability:** Easy to locate components, hooks, and context specific to a feature.
4. **Parallel Development:** Different team members can work on different features independently without conflicts.

#### When to Create a New Feature?

A new feature should be created when:

1. It represents a distinct part of the user interface or user experience (e.g., `info-page`, `home-sponsor`).
2. It has its own state management or specific data requirements.
3. It interacts with external APIs or services independently.

Following this structure makes collaboration easier and the application more maintainable. Feel free to navigate through the directories and explore how each feature is self-contained and easily understandable.

---

### 2.7. lib/

The `lib` folder in our project is dedicated to managing **third-party libraries**. This structure helps to keep our application code clean and modular by isolating third-party integrations into their own space.

#### Why Use a `lib` Folder?

When building complex applications, we often integrate third-party libraries like Axios, JWT, NextAuth, and more. Mixing third-party logic with application-specific logic can lead to:

- Difficult maintenance
- High coupling between application logic and external dependencies
- Harder debugging and upgrades

The `lib` folder addresses these issues by keeping third-party logic **independent and organized**.

#### Directory Layout

Below is an example of the structure:

```
lib
├── axios
│   └── index.ts          # Axios instance configuration
│
├── jsonwebtoken
│   └── index.ts          # JWT configuration and signing logic
│
├── next-auth
│   ├── authOptions.ts    # NextAuth options and configurations
│   ├── env.ts            # Environment variables for auth
│   ├── getSession.ts     # Session retrieval logic
│   ├── types.ts          # TypeScript types for auth
│   └── useAdmin.ts       # Hook to manage admin privileges
│
├── react-cookie
│   └── index.ts          # React cookie management logic
│
├── stripe
│   └── index.ts          # Stripe API logic and configuration
│
└── swr
    └── index.ts          # SWR configuration for data fetching
```

#### Key Features

1. **Modularization:** Each library is isolated to its own folder, allowing for easy navigation and reduced conflicts.
2. **Reusability:** Common configurations and logic are centralized, avoiding repetition.
3. **Clear Separation:** Application-specific logic remains outside of `lib`, ensuring a clear separation of concerns.
4. **Ease of Upgrades:** Upgrading or swapping out libraries becomes more straightforward when they are not intertwined with business logic.

#### Guidelines for Adding New Libraries

1. **Create a folder** under `lib` with the library's name.
2. **Initialize configuration** in an `index.ts` file.
3. If the library is complex, consider splitting logic into multiple files (e.g., `authOptions.ts`, `types.ts`).
4. **Avoid business logic**—only include code that is strictly related to the library's integration.

---

### 2.8. types/

The `types` folder is dedicated to storing **TypeScript interfaces and types** that are shared across the application. This provides a centralized location for all type definitions, ensuring consistency and reusability.

#### Directory Layout

```
types
├── board.ts          # Types for bulletin board-related entities
├── comment.ts        # Types for comments and replies
├── components.ts     # ignore this
├── hook.ts           # Types for custom hooks
├── images.ts         # Types for image handling and metadata
├── like.ts           # Types for like functionality
├── pocha.ts          # Types for Pocha-specific components
├── post.ts           # Types for posts and articles
├── user.ts           # Types for user information and authentication
```

#### Guidelines

- Keep each type in its own file named appropriately (`post.ts`, `user.ts`).
- Avoid mixing different concerns in one file.
- Update `types.md` if you make significant changes or add new types.

---

### 2.9. utils/

This folder contains utility functions for the project.

```
src/utils/
├── fonts/
├── formats/
├── styles/
```

### 2.10. middleware.ts

Checkout the comments in the file for more information.
