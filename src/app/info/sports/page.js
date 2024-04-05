import React from "react";
import { sejongHospitalLight } from "../../../utils/fonts/textFonts";

// data
import { sportsPageData } from "../../../config/static/infoPageData";

// sub-ui components
import InfoTitle from "../../../components/shared/InfoTitle";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import SectionIntro from "../../../components/Info/SectionIntro";

export default function SportsPage() {
  const { infoType, infoTitle, sections } = sportsPageData;

  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
pb-[100px] md:pb-[125px] lg:pb-[150px]
px-[20px] md:px-[60px] lg:px-[75px]"
    >
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Description */}
      <div
        className="flex flex-col gap-8 md:gap-10 lg:gap-12 items-center 
      mt-8 md:mt-10 lg:mt-12"
      >
        <p
          className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
        >
          미시간 대학교 내에는 스포츠 시설이 완비 되어 원하는 운동의 대부분을
          즐길 수 있습니다.
        </p>
      </div>

      {/* Sections: 운동시설 + 종목별 안내 */}
      <div className="flex flex-col gap-24 sm:gap-36 md:gap-48 lg:gap-64  mt-12 md:mt-20 lg:mt-28">
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
