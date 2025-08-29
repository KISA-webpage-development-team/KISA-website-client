import { MenuByCategory, MenuItemRaw } from "@/types/pocha";
/**
 * converts list of MenuCategory to list of MenuItemRaw
 */
export function convertMenuByCategoryToRawList(
  menuByCategoryList: MenuByCategory[]
): MenuItemRaw[] {
  const menuRawList: MenuItemRaw[] = [];

  menuByCategoryList.forEach((menuByCategory) => {
    const category = menuByCategory.category;
    menuByCategory.menusList.forEach((menuItem) => {
      const { category: _, ...menuItemRaw } = menuItem; // Exclude category from menuItem
      menuRawList.push({ ...menuItemRaw, category }); // Add the category from menuByCategory
    });
  });

  return menuRawList;
}
