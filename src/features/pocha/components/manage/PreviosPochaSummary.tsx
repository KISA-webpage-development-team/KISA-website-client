// PreviousPochaSummary.tsx
import { useEffect, useState } from 'react';
import { getPochaMenu } from '@/apis/pocha/queries';
import { PochaInfoWithoutStatus } from '@/types/pocha';
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from '@/utils/fonts/textFonts';

interface PreviousPochaSummaryProps {
  pochaInfo: PochaInfoWithoutStatus;
  onClick?: () => void;
  isSelected?: boolean;
}

function PreviousPochaSummary({
  pochaInfo,
  onClick,
  isSelected,
}: PreviousPochaSummaryProps) {
  const [menuList, setMenuList] = useState<any[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menus = await getPochaMenu(pochaInfo.pochaID);
        const allMenus =
          menus?.flatMap((category: any) => category.menusList) || [];
        setMenuList(allMenus);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
        setMenuList([]);
      } finally {
        setIsLoadingMenu(false);
      }
    };

    fetchMenu();
  }, [pochaInfo.pochaID]);

  return (
    <div
      className={`border rounded-lg p-4 shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-500' : ''
      } ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
      onClick={onClick}
    >
      <h3 className={`${sejongHospitalBold.className} text-xl mb-2`}>
        {pochaInfo.title}
      </h3>

      <p className={`${sejongHospitalLight.className} text-gray-600 mb-2`}>
        {pochaInfo.description}
      </p>

      <div className='text-sm text-gray-500 mb-2'>
        <div>시작: {new Date(pochaInfo.startDate).toLocaleString('ko-KR')}</div>
        <div>종료: {new Date(pochaInfo.endDate).toLocaleString('ko-KR')}</div>
      </div>

      <div className={`${sejongHospitalBold.className} text-sm`}>
        메뉴:{' '}
        <span className={`${sejongHospitalLight.className}`}>
          {isLoadingMenu
            ? '로딩 중...'
            : menuList.length > 0
            ? menuList.map((menu) => menu.nameKor).join(', ')
            : '메뉴 없음'}
        </span>
      </div>
    </div>
  );
}

export default PreviousPochaSummary;
