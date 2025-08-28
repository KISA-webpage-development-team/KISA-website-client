import React from "react";
import { useState, useMemo } from "react";
import PochaInfoFields from "./PochaInfoFields";
import PochaMenuFields from "./PochaMenuFields";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { HorizontalDivider } from "@/components/ui/divider";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { combineDateAndTime } from "@/utils/formats/date";
import { createPocha, updatePocha } from "@/apis/pocha/mutations";
import { PochaInfo } from "@/types/pocha";
import { separateDateAndTime } from "@/utils/formats/date";
import CustomButton from "@/components/ui/button/CustomButton";
interface PochaFormProps {
  mode?: "create" | "update";
  existingPochaInfo?: PochaInfo;
}
export default function PochaForm({
  mode = "create",
  existingPochaInfo,
}: PochaFormProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const { date: existingStartDate, time: existingStartTime } =
    separateDateAndTime(existingPochaInfo?.startDate);
  const { date: existingEndDate, time: existingEndTime } = separateDateAndTime(
    existingPochaInfo?.endDate
  );

  const email = session?.user?.email;
  const token = session?.token;

  const { menus } = usePochaManage();

  const [title, setTitle] = useState<string>(existingPochaInfo?.title || null);
  const [description, setDescription] = useState<string>(
    existingPochaInfo?.description || null
  );
  const [startDate, setStartDate] = useState<string>(existingStartDate || null);
  const [startTime, setStartTime] = useState<string>(existingStartTime || null);
  const [endDate, setEndDate] = useState<string>(existingEndDate || null);
  const [endTime, setEndTime] = useState<string>(existingEndTime || null);

  const pochaInfoFields = useMemo(
    () => [
      {
        value: title,
        setValue: setTitle,
        label: "포차 이름",
        type: "text",
        isError: title?.length === 0,
        errorMsg: "포차 제목을 입력해주세요.",
        errorState: "error",
      },
      {
        value: description,
        setValue: setDescription,
        label: "포차 설명",
        type: "text",
        isError: description?.length === 0,
        errorMsg: "포차 설명을 입력해주세요.",
        errorState: "error",
      },
      {
        value: startDate,
        setValue: setStartDate,
        label: "시작 날짜",
        type: "date",
        isError: startDate !== null && startDate?.length !== 10,
        errorMsg: "유효한 시작 날짜를 입력해주세요.",
        errorState: "error",
      },
      {
        value: startTime,
        setValue: setStartTime,
        label: "시작 시간",
        type: "time",
        isError: startTime !== null && startTime?.length !== 5,
        errorMsg: "유효한 시작 시간을 입력해주세요.",
        errorState: "error",
      },
      {
        value: endDate,
        setValue: setEndDate,
        label: "종료 날짜",
        type: "date",
        isError: endDate !== null && endDate?.length !== 10,
        errorMsg: "유효한 종료 날짜를 입력해주세요.",
        errorState: "error",
      },
      {
        value: endTime,
        setValue: setEndTime,
        label: "종료 시간",
        type: "time",
        isError: endTime !== null && endTime?.length !== 5,
        errorMsg: "유효한 종료 시간을 입력해주세요.",
        errorState: "error",
      },
    ],
    [title, description, startDate, startTime, endDate, endTime]
  );

  // form validation
  const isFormValid = useMemo(() => {
    for (const field of pochaInfoFields) {
      if (field.value === "" || field.isError) {
        return false;
      }
    }

    // if menus are empty, return false
    if (menus.length === 0) {
      return false;
    }

    // if menus are not empty, return true
    return true;
  }, [pochaInfoFields, menus]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      return;
    }

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
      if (mode === "create") {
        await createPocha(input, token);
        window.alert(`${title} 포차 생성이 완료되었습니다.`);
      } else {
        await updatePocha(existingPochaInfo.pochaID, input, token);
        window.alert(`${title} 포차 수정이 완료되었습니다.`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating pocha:", error);
      window.alert("포차 생성/수정에 실패했습니다.");
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
      className="flex flex-col gap-6"
    >
      <PochaInfoFields fields={pochaInfoFields} />

      <HorizontalDivider />

      <PochaMenuFields />

      <HorizontalDivider />
      <CustomButton
        text={mode === "create" ? "포차 생성하기" : "포차 수정하기"}
        disabled={!isFormValid}
        className={`${sejongHospitalBold.className} w-full`}
        forSubmit={true}
      />
    </form>
  );
}
