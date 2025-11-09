import React, { useState } from 'react';
import { OrderItem } from '@/types/pocha';
import {
  calculateFoodRankings,
  calculateDrinkRankings,
  analyzeSojuSales,
  calculateSummary,
} from '../../utils/orderHistoryUtils';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';

interface DetailedOrderSummaryModalProps {
  handleCloseForm: () => void;
  orderHistory: OrderItem[];
  pochaTitle: string;
}

import { PochaHistoryTab } from '@/types/pocha';

export default function DetailedOrderSummaryModal({
  handleCloseForm,
  orderHistory,
  pochaTitle,
}: DetailedOrderSummaryModalProps) {
  const [activeTab, setActiveTab] = useState<PochaHistoryTab>('overview');

  const { totalSales, anjuRevenue, drinkRevenue } =
    calculateSummary(orderHistory);
  const foodRankings = calculateFoodRankings(orderHistory);
  const drinkRankings = calculateDrinkRankings(orderHistory);
  const sojuAnalysis = analyzeSojuSales(orderHistory);

  return (
 <></>
  );
}