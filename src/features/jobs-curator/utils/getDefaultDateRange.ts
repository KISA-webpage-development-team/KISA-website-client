import { addMonths } from "date-fns";

const MAY = 4;
const AUGUST = 7;
const SEPTEMBER = 8;
const FEBRUARY = 1;
const SUMMER_INTERNSHIP_LENGTH_MONTHS = 3;

export function getDefaultInternshipDateRange(today: Date = new Date()) {
  const year = today.getFullYear();
  const summerStart   = new Date(year, MAY, 1);
  const summerEnd     = new Date(year, AUGUST, 31);
  const fallStart     = new Date(year, SEPTEMBER, 1);
  const nextSpringEnd = new Date(year + 1, FEBRUARY, 1);

  const isDuringSummer  = today >= summerStart && today <= summerEnd;
  const isFallSemester  = today >= fallStart   && today <  nextSpringEnd;
  // NOTE: `isAfterFebruary` is unreachable as written. `year` is derived from
  // `today.getFullYear()`, so `today >= Feb 1 of (year + 1)` can never hold —
  // the branch was likely intended to handle Jan/Feb of the following year and
  // should be revisited. Pre-summer (Jan–Apr) currently falls through to the
  // final `else` returning this year's summer window, which matches intent.
  const isAfterFebruary = today >= nextSpringEnd;

  if (isDuringSummer) {
    return { start: today, end: addMonths(today, SUMMER_INTERNSHIP_LENGTH_MONTHS) };
  }
  if (isFallSemester) {
    const start = addMonths(today, 1);
    return { start, end: addMonths(start, SUMMER_INTERNSHIP_LENGTH_MONTHS) };
  }
  if (isAfterFebruary) {
    return {
      start: new Date(year + 1, MAY, 1),
      end:   new Date(year + 1, AUGUST, 31),
    };
  }
  return { start: summerStart, end: summerEnd };
}
