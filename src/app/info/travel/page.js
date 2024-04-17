import React from "react";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import InfoTitle from "../../../components/shared/InfoTitle";
import { travelPageData } from "../../../config/static/infoPageData";
import SectionIntro from "../../../components/Info/SectionIntro";

export default function TravelPage() {
  const { infoType, infoTitle, sections } = travelPageData;

  return (
    <section>
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Sections: Ann Arbor + Detroit + 근교 도시 및 명소 */}
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
