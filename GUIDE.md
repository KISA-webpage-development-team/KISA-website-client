# Ulitmate Guide on KISA-WEB Client Project Structure

This is a doc dedicated to explain `src` folder structure of the repository.

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
