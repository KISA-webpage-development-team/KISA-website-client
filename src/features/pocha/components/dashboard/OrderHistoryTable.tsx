import React, { useState } from 'react';

import useOrderHistory from '@/features/pocha/hooks/useOrderHistory';
import LoadingSpinner from '@/components/ui/feedback/LoadingSpinner';
import { calculateStripeTotalPrice } from '@/features/pocha/utils/calculateStripeFee';
import {
  calculateTotalSales,
  calculateSummary,
  convertOrderHistoryToMenuMap,
} from '@/features/pocha/utils/orderHistoryUtils';
import OrderSummaryModal from './OrderSummaryModal';

interface OrderHistoryTableProps {
  token: string;
  pochaID: number;
}

type FilterOption = 'all' | 'food' | 'drink';

export default function OrderHistoryTable({
  token,
  pochaID,
}: OrderHistoryTableProps) {
  const { orderHistory, status } = useOrderHistory(token, pochaID);

  const [filter, setFilter] = useState<FilterOption>('all');

  const [openSummaryModal, setOpenSummaryModal] = useState<boolean>(false);

  const menuMap = convertOrderHistoryToMenuMap(orderHistory);

  const filteredOrderHistory = orderHistory?.filter(({ menu }) => {
    if (filter === 'all') return true;
    return filter === 'food' ? !menu.isImmediatePrep : menu.isImmediatePrep;
  });

  if (status === 'loading') {
    return (
      <LoadingSpinner fullScreen={false} label='주문 기록을 가져오는중...' />
    );
  }

  if (status === 'error') {
    throw new Error('Error fetching order history');
  }

  if (!filteredOrderHistory) {
    return <div>No order history found</div>;
  }

  return (
    <div className='w-full'>
      <div className='p-4 space-y-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex space-x-4'>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('food')}
              className={`px-4 py-2 ${
                filter === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              안주
            </button>
            <button
              onClick={() => setFilter('drink')}
              className={`px-4 py-2 ${
                filter === 'drink' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              주류
            </button>
          </div>
          <button
            onClick={() => setOpenSummaryModal(true)}
            className='px-4 py-2 bg-green-500 text-white'
          >
            요약하기
          </button>
          {
            openSummaryModal && (
              <OrderSummaryModal
                handleCloseForm={() => setOpenSummaryModal(false)}
                orderHistory={orderHistory}
              />
            )
          }
        </div>

        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr className='text-sm text-black text-center'>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Order #
              </th>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Item
              </th>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Quantity
              </th>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Price + Fee
              </th>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Customer
              </th>
              <th className='px-6 py-3 font-medium uppercase tracking-wider'>
                Email
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredOrderHistory?.map(
              (
                { orderItemID, menu, quantity, ordererName, ordererEmail },
                index
              ) => (
                <tr key={`${orderItemID}-${index}`} className='text-center'>
                  <td className='px-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                    #{orderItemID}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                    {menu.nameKor}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                    {quantity}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                    ${menu.price.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                    ${calculateStripeTotalPrice(menu.price).toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                    {ordererName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                    {ordererEmail}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
