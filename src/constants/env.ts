// `env.ts`
// : all of the environment variables (.env, .env.local) are loaded here
// and exported to be used in the app.

// Google Auth
export const GOOGLE_ID = process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "";
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET
  ? process.env.GOOGLE_SECRET
  : "";

// Google Calendar
export const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  : "";
export const GOOGLE_CALENDAR_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  : "";

// Backend
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
