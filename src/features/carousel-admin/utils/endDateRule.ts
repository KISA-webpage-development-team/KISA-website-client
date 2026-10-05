type RuleItem = {
  carouselItemID: number;
  endDate: string | null;
  created: string;
};

/**
 * End-date rule, the same one the backend uses to place new and restored
 * items: soonest end date first, undated items last, newest first on ties.
 * Dates are ISO strings, so they compare as strings.
 */
export function compareByEndDateRule(a: RuleItem, b: RuleItem): number {
  if (a.endDate !== b.endDate) {
    if (a.endDate === null) return 1;
    if (b.endDate === null) return -1;
    return a.endDate < b.endDate ? -1 : 1;
  }
  if (a.created === b.created) return 0;
  return a.created < b.created ? 1 : -1;
}

export function sortByEndDateRule<T extends RuleItem>(items: T[]): T[] {
  return [...items].sort(compareByEndDateRule);
}
