import React from 'react';
import { useState, useMemo } from 'react';
import PochaInfoFields from './PochaInfoFields';
import PochaMenuFields from './PochaMenuFields';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import { HorizontalDivider } from '@/components/ui/divider';
import { usePochaManage } from '../../contexts/PochaManageContext';
import { useSession } from 'next-auth/react';
import { UserSession } from '@/lib/next-auth/types';
import { combineDateAndTime } from '@/utils/formats/date';
import { createPocha } from '@/apis/pocha/mutations';
import { useRouter } from 'next/navigation';

export default function PochaForm() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const email = session?.user?.email;
  const token = session?.token;

  const { menus } = usePochaManage();
  console.log(menus);
  const [title, setTitle] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);
  const [startDate, setStartDate] = useState<string>(null);
  const [startTime, setStartTime] = useState<string>(null);
  const [endDate, setEndDate] = useState<string>(null);
  const [endTime, setEndTime] = useState<string>(null);

  // const [disabled, setDisabled] = useState(true);

  const pochaInfoFields = useMemo(
    () => [
      {
        value: title,
        setValue: setTitle,
        label: '포자 이름',
        type: 'text',
        isError: title?.length === 0,
        errorMsg: '포자 제목을 입력해주세요.',
        errorState: 'error',
      },
      {
        value: description,
        setValue: setDescription,
        label: '포자 설명',
        type: 'text',
        isError: description?.length === 0,
        errorMsg: '포자 설명을 입력해주세요.',
        errorState: 'error',
      },
      {
        value: startDate,
        setValue: setStartDate,
        label: '시작 날짜',
        type: 'date',
        isError: startDate !== null && startDate?.length !== 10,
        errorMsg: '유효한 시작 날짜를 입력해주세요.',
        errorState: 'error',
      },
      {
        value: startTime,
        setValue: setStartTime,
        label: '시작 시간',
        type: 'time',
        isError: startTime !== null && startTime?.length !== 5,
        errorMsg: '유효한 시작 시간을 입력해주세요.',
        errorState: 'error',
      },
      {
        value: endDate,
        setValue: setEndDate,
        label: '종료 날짜',
        type: 'date',
        isError: endDate !== null && endDate?.length !== 10,
        errorMsg: '유효한 종료 날짜를 입력해주세요.',
        errorState: 'error',
      },
      {
        value: endTime,
        setValue: setEndTime,
        label: '종료 시간',
        type: 'time',
        isError: endTime !== null && endTime?.length !== 5,
        errorMsg: '유효한 종료 시간을 입력해주세요.',
        errorState: 'error',
      },
    ],
    [title, description, startDate, startTime, endDate, endTime]
  );

  // # input
  // # {
  // #  "email": "string",
  // #  "startDate": "YYYY-MM-DDTHH:MM:SS",
  // #  "endDate": "YYYY-MM-DDTHH:MM:SS",
  // #  "title": "string",
  // #  "description": "string"
  // #  "menus": [
  // #      {
  // #          "nameKor": "string",
  // #          "nameEng": "string",
  // #          "category": "string",
  // #          "price": float,
  // #          "stock": int,
  // #          "isImmediatePrep": boolean,
  // #          "ageCheckRequired": boolean (optional, default to false)
  // #      }
  // #  ]
  // # }

 const handleSubmit = async () => {
    // TODO:
    // 1. form validation

    //2. input formatting (eg. date + time -> "YYYY-MM-DDTHH:MM:SS")

    const newStartDateTime = combineDateAndTime(startDate, startTime);
    const newEndDateTime = combineDateAndTime(endDate, endTime);

    const input = {
      email: email,
      startDate: newStartDateTime,
      endDate: newEndDateTime,
      title: title,
      description: description,
      menus: menus,
    };


    //3. API call
    try {
      const result = await createPocha(input, token);
      console.log(result);
      // router.refresh();
    } catch (error) {
      console.error('Error creating pocha:', error);
    }
    
    //3-1. success -> reloading
    //3-2. fail -> show error message
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className='flex flex-col gap-6
     w-3/4 mx-auto'
    >
      <PochaInfoFields fields={pochaInfoFields} />

      <HorizontalDivider />

      <PochaMenuFields />

      <HorizontalDivider />
      <button type='submit' className='w-full primary_btn' >
        포차 생성하기
      </button>
    </form>
  );
}
