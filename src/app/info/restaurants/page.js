import React from "react";
import SectionTitle from "@/features/info-page/components/SectionTitle";
import SectionGrid from "@/features/info-page/components/SectionGrid";
import InfoTitle from "@/features/info-page/components/InfoTitle";
import { restaurantsPageData } from "@/features/info-page/data/infoPageData";
import SectionIntro from "@/features/info-page/components/SectionIntro";

import "../info.css";

export const metadata = {
  title: "식생활",
  description:
    "미시간 대학교 캠퍼스의 다양한 음식점들을 소개합니다. 한식부터 파인 다이닝까지 다양한 후기와 정보들이 담겨있습니다.",
};

export default function RestaurantsPage() {
  const { infoType, infoTitle, sections } = restaurantsPageData;

  return (
    <section className="pt-3 md:pt-4 lg:pt-5">
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Sections: 한식 + 아시안 + 햄버거 & 피자 + 디저트 + 파인 다이닝 + 기타 */}
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
