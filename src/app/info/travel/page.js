import React from "react";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import InfoTitle from "../../../components/shared/InfoTitle";
import { travelPageData } from "../../../config/static/infoPageData";
import SectionIntro from "../../../components/Info/SectionIntro";

export default function TravelPage() {
  const { infoType, infoTitle, sections } = travelPageData;

  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
  pb-[100px] md:pb-[125px] lg:pb-[150px]"
    >
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Sections: Ann Arbor + Detroit + 근교 도시 및 명소 */}
      <div className="flex flex-col gap-48 md:gap-64 lg:gap-72 mt-8 md:mt-10 lg:mt-12">
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
