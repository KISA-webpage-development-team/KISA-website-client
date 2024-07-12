import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { Spinner } from "@nextui-org/react";
import React from "react";

export function LoadingSpinner() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
      <Spinner
        size="lg"
        label="로딩중입니다"
        color="secondary"
        labelColor="primary"
        className={`${sejongHospitalBold.className} justify-self-center self-center`}
      />
    </div>
  );
}
