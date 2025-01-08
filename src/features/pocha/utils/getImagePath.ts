export const getMenuImagePath = (menuID: number) => {
  // Just for the bulgogi case. Else, (menuID != 1) condition should be (menuID != null).
  return menuID != 1
    ? `/pocha/24_last_pocha/${menuID}.png`
    : "/pocha/24_last_pocha/image_not_found.png";
};
