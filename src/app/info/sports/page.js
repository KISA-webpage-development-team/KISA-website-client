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
    <section className="pt-3 md:pt-4 lg:pt-5">
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Description */}
      <div className="intro_and_desc">
        <p
          className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
        >
          미시간 대학교 내에는 스포츠 시설이 완비 되어 원하는 운동의 대부분을
          즐길 수 있습니다.
        </p>
      </div>

      {/* Sections: 운동시설 + 종목별 안내 */}
      <div className="section_list">
        {sections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div key={index} className="section_list_item">
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
