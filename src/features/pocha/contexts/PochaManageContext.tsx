import { createContext, useContext, useState } from 'react';
import { MenuItemRaw } from '@/types/pocha';


type PochaManageState = {
  menus: MenuItemRaw[];
  setMenus: (menus: MenuItemRaw[]) => void;
};

const PochaManageContext = createContext<PochaManageState | undefined>(
  undefined
);

export const PochaManageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menus, setMenus] = useState<MenuItemRaw[]>([]);

  return (
    <PochaManageContext.Provider
      value={{
        menus,
        setMenus,
      }}
    >
      {children}
    </PochaManageContext.Provider>
  );
};

export function usePochaManage() {
  const ctx = useContext(PochaManageContext);
  if (!ctx)
    throw new Error('usePochaManage must be used within PochaManageProvider');
  return ctx;
}
