import React from "react";
import {
  sejongHospitalLight,
  sejongHospitalBold,
} from "../../../utils/fonts/textFonts";
import InfoTitle from "../../../components/shared/InfoTitle";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import { campusPageData } from "../../../config/static/infoPageData";
import SectionIntro from "../../../components/Info/SectionIntro";

export default function CampusInfoPage() {
  const { infoType, infoTitle, sections } = campusPageData;

  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
    pb-[100px] md:pb-[125px] lg:pb-[150px]"
    >
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Intro + Description */}
      <div
        className="flex flex-col gap-8 md:gap-10 lg:gap-12 items-center 
      mt-8 md:mt-10 lg:mt-12"
      >
        <div
          className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl`}
        >
          캠퍼스 정보
        </div>
        <p
          className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
        >
          재학생들은 대부분 캠퍼스 내의 빌딩을 풀네임보다는 줄여서 부르거나
          이니셜로 부릅니다. <br />
          수강 신청 후 Wolverine Access 에서 볼 수 있는 시간표에서도 마찬가지로
          이니셜을 확인하실 수 있습니다. <br />
          아래에서 각 빌딩의 줄임말 혹은 이니셜과 더불어 빌딩 정보를 확인하실 수
          있습니다.
        </p>
      </div>

      {/* Sections: Central Campus + North Campus */}
      <div className="flex flex-col gap-48 md:gap-64 lg:gap-72 mt-24 md:mt-32 lg:mt-36">
        {sections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div
              key={index}
              className="flex flex-col gap-6 md:gap-10 lg:gap-12"
            >
              <SectionTitle
                infoType={infoType.toLowerCase()}
                sectionName={sectionName}
                sectionText={sectionText}
              />
              <SectionIntro sectionIntro={sectionIntro} />
              <SectionGrid
                infoType={infoType.toLowerCase()}
                sectionName={sectionName}
                contentList={contentList}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
