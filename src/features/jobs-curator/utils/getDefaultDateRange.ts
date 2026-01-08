export function getDefaultInternshipDateRange(today: Date = new Date()) {
  const year = today.getFullYear();

  // Define key dates
  const summerStart = new Date(year, 4, 1); // May 1
  const summerEnd = new Date(year, 7, 31); // August 31
  const septStart = new Date(year, 8, 1); // September 1
  const nextFebStart = new Date(year + 1, 1, 1); // Feb 1 next year

  let start: Date, end: Date;

  if (today >= summerStart && today <= summerEnd) {
    // During summer: today ~ today + 3 months
    start = today;
    end = new Date(today);
    end.setMonth(end.getMonth() + 3);
  } else if (today >= septStart && today < nextFebStart) {
    // After summer, before next Feb: next month ~ next month + 3 months
    start = new Date(today);
    start.setMonth(start.getMonth() + 1);
    end = new Date(start);
    end.setMonth(end.getMonth() + 3);
  } else if (today >= nextFebStart) {
    // After summer and after Feb: next summer
    start = new Date(year + 1, 4, 1); // May 1 next year
    end = new Date(year + 1, 7, 31); // August 31 next year
  } else {
    // Before summer: this summer
    start = summerStart;
    end = summerEnd;
  }

  return { start, end };
}
