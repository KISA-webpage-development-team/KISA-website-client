import { MenuItemRaw } from "@/types/pocha";

/**
 * The pocha-manage flow identifies in-flight menu items by `nameEng`.
 * This is enforced at the form level via duplicate-check `validate` rules,
 * but the invariant is otherwise implicit. Centralize the identity check
 * here so the assumption is grep-able from one location.
 *
 * (Long-term: replace with a client-side UUID assigned at insert time.)
 */
export function isSameMenu(a: MenuItemRaw, b: MenuItemRaw): boolean {
  return a.nameEng === b.nameEng;
}

export function findMenuByNameEng(
  menus: MenuItemRaw[],
  nameEng: string
): MenuItemRaw | undefined {
  return menus.find((m) => m.nameEng === nameEng);
}

export function hasMenuWithNameKor(
  menus: MenuItemRaw[],
  nameKor: string
): boolean {
  return menus.some((m) => m.nameKor === nameKor);
}

export function hasMenuWithNameEng(
  menus: MenuItemRaw[],
  nameEng: string
): boolean {
  return menus.some((m) => m.nameEng === nameEng);
}
