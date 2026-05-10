/**
 * Graduation-year window shared by /signup and /users/edit.
 *
 * Rolling 15-year span centered on the current year:
 *   currentYear-6 .. currentYear+8
 *
 * Includes 6 prior years for alumni still updating their profile and
 * 8 future years for incoming undergrads + grad-program runways.
 */
export function getGradYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 + 8 + 1 }, (_, i) => currentYear - 6 + i);
}
