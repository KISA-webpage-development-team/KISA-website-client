import React from "react";
import { MenuItemRaw, PochaInfo } from "@/types/pocha";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { formatDateTimeString } from "@/utils/formats/date";
import CustomButton from "@/components/ui/button/CustomButton";

interface PochaSummaryProps {
  pochaInfo: PochaInfo;
  isEditPochaFormOpen: boolean;
  setIsEditPochaFormOpen: (isOpen: boolean) => void;
  menuList: MenuItemRaw[];
}
export default function PochaSummary({
  pochaInfo,
  isEditPochaFormOpen,
  setIsEditPochaFormOpen,
  menuList,
}: PochaSummaryProps) {


  return (
    <div
      className={`flex flex-col ${sejongHospitalBold.className} gap-2
      bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors
    `}
    >
      <div className='flex justify-between items-center'>
        <h2 className='text-xl'>
          {pochaInfo.title}
          {pochaInfo.ongoing ? ' (진행 중)' : ' (진행 예정)'}
        </h2>
        <CustomButton
          text={isEditPochaFormOpen ? '수정 취소' : '수정하기'}
          onClick={() => {
            setIsEditPochaFormOpen(!isEditPochaFormOpen);
          }}
        />
      </div>

      <div className='flex flex-col gap-2 text-lg'>
        <span>
          설명:{' '}
          <span className={`${sejongHospitalLight.className}`}>
            {pochaInfo.description}
          </span>
        </span>
        <span>
          시작 날짜:{' '}
          <span className={`${sejongHospitalLight.className}`}>
            {formatDateTimeString(pochaInfo.startDate)}
          </span>
        </span>
        <span>
          종료 날짜:{' '}
          <span className={`${sejongHospitalLight.className}`}>
            {formatDateTimeString(pochaInfo.endDate)}
          </span>
        </span>
      </div>

      <div className='flex flex-col gap-2 text-lg'>
        <span>
          메뉴:{' '}
          <span className={`${sejongHospitalLight.className}`}>
            {menuList.map((menu) => menu.nameKor).join(', ')}
          </span>
        </span>
      </div>
    </div>
  );
}
