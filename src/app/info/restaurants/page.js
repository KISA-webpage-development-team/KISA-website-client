import React from "react";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import InfoTitle from "../../../components/shared/InfoTitle";
import { restaurantsPageData } from "../../../config/static/infoPageData";
import SectionIntro from "../../../components/Info/SectionIntro";

export default function RestaurantsPage() {
  const { infoType, infoTitle, sections } = restaurantsPageData;

  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
pb-[100px] md:pb-[125px] lg:pb-[150px]"
    >
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Sections: 한식 + 아시안 + 햄버거 & 피자 + 디저트 + 파인 다이닝 + 기타 */}
      <div className="flex flex-col gap-24 sm:gap-36 md:gap-48 lg:gap-64 mt-12 md:mt-20 lg:mt-28">
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
