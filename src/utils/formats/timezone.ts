/**
 * Timezone-aware date/time formatting + conversion for KISA's Michigan-based
 * operations.
 *
 * Contract:
 *   - Backend stores timestamps as UTC (ISO strings with `Z`).
 *   - Admins enter and read times as **Eastern Time** (America/Detroit —
 *     auto-handles EDT/EST and DST transitions).
 *   - Frontend converts ET wall-clock → UTC before POST, and UTC → ET
 *     wall-clock for display.
 *
 * Do NOT use the legacy `formatDateOnly` / `formatTimeOnly` / `formatDateTimeString`
 * helpers from `./date.ts` for pocha times — those read raw UTC numbers and
 * ignore the viewer's timezone, which is correct only for legacy screens not
 * yet migrated to the ET contract above.
 */

export const APP_TIMEZONE = "America/Detroit";

/**
 * Format a Date/ISO-string as `YYYY.MM.DD` in the app timezone.
 */
export function formatDateInTz(
  date: Date | string,
  tz: string = APP_TIMEZONE,
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  // 'en-CA' yields `YYYY-MM-DD`; we swap separator to the KISA-standard dot.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .replace(/-/g, ".");
}

/**
 * Format a Date/ISO-string as `HH:MM` (24-hour) in the app timezone.
 */
export function formatTimeInTz(
  date: Date | string,
  tz: string = APP_TIMEZONE,
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Convert an ET wall-clock string (from `<input type="datetime-local">`, e.g.
 * `"2026-04-21T18:00"`) into a UTC Date suitable for `toISOString()` before
 * POSTing to the backend.
 *
 * Works across DST boundaries because `Intl.DateTimeFormat` with a timezone
 * returns the correct offset for any given moment.
 */
export function wallClockToUtc(
  wallClock: string,
  tz: string = APP_TIMEZONE,
): Date {
  // Step 1: parse the wall-clock string as if it were UTC. Gives us a Date
  // whose *UTC numbers* match the input numbers but the actual UTC moment
  // is off by the target-timezone offset.
  const asIfUtc = new Date(
    wallClock.length === 16 ? `${wallClock}:00Z` : `${wallClock}Z`,
  );

  // Step 2: format `asIfUtc` IN the target timezone to discover what local
  // time those UTC numbers would display as in that zone.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(asIfUtc)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});

  // Step 3: treat those displayed-in-tz numbers as if they were UTC to get
  // a second "naive UTC" moment. The difference between the two naive
  // moments is exactly the tz offset at this instant.
  const tzAsUtcMs = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  const offsetMs = tzAsUtcMs - asIfUtc.getTime();

  // Step 4: apply the offset to the original input so the result's
  // *wall-clock in tz* equals the input wall-clock.
  return new Date(asIfUtc.getTime() - offsetMs);
}
