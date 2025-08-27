import React from 'react';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import { useState } from 'react';
import PochaMenuItemForm from './PochaMenuItemForm';
import { usePochaManage } from '../../contexts/PochaManageContext';
import PochaMenuItemList from './PochaMenuItemList';
export default function PochaMenuFields() {
  const [isItemFormOpen, setIsItemFormOpen] = useState<boolean>(false);
  const { menus } = usePochaManage();

  const handleItemAddButtonClick = () => {
    setIsItemFormOpen(true);
  };

  const handleItemFormClose = () => {
    setIsItemFormOpen(false);
  }
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2
          className={`flex items-start gap-1
      ${sejongHospitalBold.className} text-sm md:text-base`}
        >
          메뉴
        </h2>
        <button
          type='button'
          className='primary_btn'
          onClick={handleItemAddButtonClick}
        >
          추가하기
        </button>
      </div>

      {menus.length > 0 && <PochaMenuItemList />}
      {isItemFormOpen && <PochaMenuItemForm closeItemForm={handleItemFormClose} />}
    </div>
  );
}
