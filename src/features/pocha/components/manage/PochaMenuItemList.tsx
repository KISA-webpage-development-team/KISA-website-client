import React from 'react';
import { usePochaManage } from '../../contexts/PochaManageContext';
import CustomDisplay from '@/deprecated-components/shared/CustomDisplay';
import { CustomButton } from '@/components/ui/button';
export default function PochaMenuItemList() {
  const { menus, setMenus } = usePochaManage();

  const onDelete = (nameEngToDelete: string, nameKor: string) => {
    if (window.confirm(`정말 ${nameKor}을(를) 삭제하시겠습니까?`)) {
      const updatedMenus = menus.filter(
        (menu) => menu.nameEng !== nameEngToDelete
      );
      setMenus(updatedMenus);
    }
  };

  return (
    <div>
      {menus.map((menu) => (
        <div key={menu.nameEng}>
          <CustomDisplay
            type='text'
            label='메뉴 이름 (한글)'
            value={menu.nameKor}
          />
          <CustomDisplay
            type='text'
            label='메뉴 이름 (영어)'
            value={menu.nameEng}
          />
          <CustomDisplay type='text' label='카테고리' value={menu.category} />
          <CustomDisplay
            type='number'
            label='가격'
            value={menu.price?.toString()}
          />
          <CustomDisplay
            type='number'
            label='재고'
            value={menu.stock?.toString()}
          />
          <CustomDisplay
            type='checkbox'
            label='즉시 준비'
            value={menu.isImmediatePrep}
          />
          <CustomDisplay
            type='checkbox'
            label='연령 확인 필요'
            value={menu.ageCheckRequired}
          />
          <div>
            <CustomButton
              text='삭제'
              onClick={() => onDelete(menu.nameEng, menu.nameKor)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
