import React, { useState } from 'react';
import { usePochaManage } from '../../contexts/PochaManageContext';
import { useMemo } from 'react';
import CustomField from '@/deprecated-components/shared/CustomField';
import { MenuItemRaw } from '@/types/pocha';

//    {
//                 "nameKor": nameKor,
//                 "nameEng": nameEng,
//                 "category": category,
//                 "price": price,
//                 "stock": stock,
//                 "isImmediatePrep": isImmediatePrep,
//                 "parentPochaID": new_pocha_id,
//                 "ageCheckRequired": ageCheckRequired,
//             }

interface PochaMenuItemFormProps {
  closeItemForm: () => void;
}

export default function PochaMenuItemForm({
  closeItemForm,
}: PochaMenuItemFormProps) {
  const { menus, setMenus } = usePochaManage();

  const [nameKor, setNameKor] = useState<string>(null);
  const [nameEng, setNameEng] = useState<string>(null);
  const [category, setCategory] = useState<string>(null);
  const [price, setPrice] = useState<number>(null);
  const [stock, setStock] = useState<number>(null);
  const [isImmediatePrep, setIsImmediatePrep] = useState<boolean>(null);
  const [ageCheckRequired, setAgeCheckRequired] = useState<boolean>(null);

  const textFields = useMemo(
    () => [
      {
        value: nameKor,
        setValue: setNameKor,
        label: '메뉴 이름 (한글)',
        type: 'text',
        isError: nameKor?.length === 0,
        errorMsg: '메뉴 이름을 입력하세요.',
        errorState: 'error',
      },
      {
        value: nameEng,
        setValue: setNameEng,
        label: '메뉴 이름 (영어)',
        type: 'text',
        isError: nameEng?.length === 0,
        errorMsg: '메뉴 이름을 입력하세요.',
        errorState: 'error',
      },
      {
        value: category,
        setValue: setCategory,
        label: '카테고리',
        type: 'text',
        isError: category?.length === 0,
        errorMsg: '카테고리를 선택하세요.',
        errorState: 'error',
      },
    ],
    [nameKor, nameEng, category]
  );

  const numberFields = useMemo(
    () => [
      {
        value: price,
        setValue: setPrice,
        label: '가격',
        type: 'number',
        isError: price < 0,
        errorMsg: '가격 >= 0',
        errorState: 'error',
      },
      {
        value: stock,
        setValue: setStock,
        label: '재고',
        type: 'number',
        isError: stock < 0,
        errorMsg: '재고 >= 0',
        errorState: 'error',
      },
    ],
    [price, stock]
  );

  const checkboxFields = useMemo(
    () => [
      {
        value: isImmediatePrep,
        setValue: setIsImmediatePrep,
        label: '즉시 준비 가능',
        type: 'checkbox',
        isError: false,
        errorMsg: '',
        errorState: 'error',
      },
      {
        value: ageCheckRequired,
        setValue: setAgeCheckRequired,
        label: '나이 확인 필수',
        type: 'checkbox',
        isError: false,
        errorMsg: '',
        errorState: 'error',
      },
    ],
    [isImmediatePrep, ageCheckRequired]
  );

  const handleSubmitButtonClick = () => {
    const newMenuItem: MenuItemRaw = {
      nameKor,
      nameEng,
      category,
      price: parseFloat(price.toString()),
      stock: parseInt(stock.toString()),
      isImmediatePrep: isImmediatePrep === true ? true : false,
      ageCheckRequired: ageCheckRequired === true ? true : false,
    };

    setMenus([...menus, newMenuItem]);
    closeItemForm();
  };
  return (
    <form className='flex flex-col gap-2'>
      <div className='flex flex-row gap-1'>
        {textFields?.map((field, index) => (
          <CustomField key={`pocha-menu-item-textfield-${index}`} {...field} />
        ))}
      </div>

      <div className='flex flex-row gap-1'>
        {numberFields?.map((field, index) => (
          <CustomField
            key={`pocha-menu-item-numberfield-${index}`}
            {...field}
          />
        ))}
      </div>

      <div className='flex flex-row gap-1'>
        {checkboxFields?.map((field, index) => (
          <CustomField
            key={`pocha-menu-item-checkboxfield-${index}`}
            {...field}
          />
        ))}
      </div>

      <button
        type='button'
        className='primary_btn'
        onClick={handleSubmitButtonClick}
      >
        추가
      </button>
    </form>
  );
}
