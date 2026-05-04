/**
 * @desc update the URL with the selected tab
 * @example "/pocha?tab=menu" <-> "/pocha?tab=orders"
 */
export const updateURLWithTab = (selectedTab: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("tab", selectedTab);
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${searchParams}`
  );
};
