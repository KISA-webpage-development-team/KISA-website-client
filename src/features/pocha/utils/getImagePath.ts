export const getMenuImagePath = (menuID: number) => {
  // Just for the bulgogi case. Else, (menuID != 1) condition should be (menuID != null).
  return `/pocha/24_last_pocha/${menuID}.png`;
};
