import React from 'react';
import { PochaInfo } from '@/types/pocha';

export default function PochaSummary({ pochaInfo}: { pochaInfo: PochaInfo }) {
  return (
    <div className='flex flex-col'>
      <h2>포차 요약</h2>
      <span>포차 이름: {pochaInfo.title}</span>
      <span>포차 설명: {pochaInfo.description}</span>
      <span>포차 시작 날짜: {pochaInfo.startDate.toString()}</span>
      <span>포차 종료 날짜: {pochaInfo.endDate.toString()}</span>
      <span>포차 진행 상태: {pochaInfo.ongoing ? '진행 중' : '진행 예정'}</span>
    </div>
  );
}
