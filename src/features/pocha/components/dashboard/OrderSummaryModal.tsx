import React from 'react';

import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import PochaCloseIcon from '@/components/ui/icon/PochaCloseIcon';
import {
  convertOrderHistoryToMenuMap,
  calculateSummary,
  calculateTotalSales,
} from '../../utils/orderHistoryUtils';
import { HorizontalDivider } from '@/components/ui/divider';

import { OrderItem } from '@/types/pocha';

interface OrderSummaryModalProps {
  handleCloseForm: () => void;
  orderHistory: OrderItem[];
}
export default function OrderSummaryModal({
  handleCloseForm,
  orderHistory,
}: OrderSummaryModalProps) {
  const menuMap = convertOrderHistoryToMenuMap(orderHistory);
  const { totalSales, anjuRevenue, drinkRevenue } =
    calculateSummary(orderHistory);

    console.log('menuMap', menuMap);
  return (
    <div className='fixed inset-0 z-[99999] bg-black/30'>
      <div className='relative z-[100000] w-full h-full flex items-center justify-center p-4'>
        <div className='relative bg-white rounded-lg shadow-md text-black border-2 border-[#71717A] w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
          {/* Header */}
          <div className='flex items-center justify-between px-6 py-2 border-b border-gray-200'>
            <h2 className={`text-xl ${sejongHospitalBold.className}`}>
              주문 요약
            </h2>
            <button
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              onClick={handleCloseForm}
            >
              <PochaCloseIcon size='large' />
            </button>
          </div>

          {/* Form Content */}
          <div className='flex flex-col p-6 gap-4'>
            <span>{`총 금액: $${totalSales}`}</span>
            <span>{`안주 매출: $${anjuRevenue} | 주류 매출: $${drinkRevenue}`}</span>
            <HorizontalDivider />

            {/* 메뉴 별 매출 */}
            <ul className='flex flex-col gap-2'>
              {Array.from(menuMap.values()).map(
                ({ menu, quantity, totalRevenue }) => (
                  <li key={`menu-revenue-summary-${menu.menuID}`}>
                    <span>{menu.nameEng}</span>
                    <span>{`수량: ${quantity}`}</span>
                    <span>{` 매출: $${totalRevenue}`}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
