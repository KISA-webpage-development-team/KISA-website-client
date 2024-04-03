// 처음 와서 할 일
import React from "react";

// sub-ui components
import InfoTitle from "../../../components/shared/InfoTitle";
import CheckList from "../../../components/Info/CheckList";

import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../../utils/fonts/textFonts";

export default function InfoCheckListPage() {
  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
pb-[100px] md:pb-[125px] lg:pb-[150px]"
    >
      <InfoTitle title="Things to Do" />

      {/* Intro + Description */}
      <div
        className="flex flex-col gap-8 md:gap-10 lg:gap-12 items-center 
mt-8 md:mt-10 lg:mt-12 w-11/12 md:w-10/12 lg:w-9/12 px-2 md:px-4 lg:px-6"
      >
        <h
          className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl`}
        >
          신입생이 입학 전에 해야 할 일
        </h>
        <p
          className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
        >
          우선 미시간 대학교에 합격하신 것을 축하드립니다! <br />
          Offer Letter 를 받고 어떤 것부터 해야 될지 막막하실 여러분들을 위해
          타임라인 예시와 어떤 것을 해야 하는지 정리했습니다. 대부분의 것들을
          작성했지만 해마다 필요한 정보 및 제출해야 할 서류가 다를 수 있기에
          정확한 정보는 꼭 학교 공식 이메일 혹은 웹사이트를 통해서 확인해 주시기
          바랍니다.
          <br />
          <br />* 아래 타임라인은 2022년 Fall 입학 기준으로 작성된 글입니다.
        </p>
      </div>

      <div
        className="flex flex-col items-center gap-12 w-full
      mt-12 md:mt-14 lg:mt-16 px-0 md:px-4 lg:px-8"
      >
        <h
          className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl`}
        >
          [Checklist]
        </h>

        {/* dropdown checklist */}
        <CheckList />
      </div>
    </section>
  );
}
