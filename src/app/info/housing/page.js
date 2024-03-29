import React from "react";
import InfoTitle from "../../../components/shared/InfoTitle";

import SectionGrid from "../../../components/Info/SectionGrid";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionIntro from "../../../components/Info/SectionIntro";

import {
  housingPageOnCampusData,
  housingPageOffCampusData,
} from "../../../config/static/infoPageData";

export default function HousingPage() {
  const infoType = "housing";
  const { sections: onCampusSections } = housingPageOnCampusData;

  const { sections: offCampusSections } = housingPageOffCampusData;

  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
pb-[100px] md:pb-[125px] lg:pb-[150px]"
    >
      {/* Information title section divider */}
      <InfoTitle title="Housing" />
      {/* Sections: On Campus + Off Campus */}
      <div className="mt-8 md:mt-10 lg:mt-12">
        <SectionTitle
          infoType={infoType.toLowerCase()}
          sectionName="on-campus"
          sectionText="On-Campus Housing"
        />
      </div>

      <div className="flex flex-col gap-48 md:gap-64 lg:gap-72 mt-8 md:mt-10 lg:mt-12">
        {/* On-Campus Housing */}

        {/* Sub Sections: Central + Hill + North */}
        {onCampusSections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div
              key={index}
              className="flex flex-col gap-6 md:gap-10 lg:gap-12"
            >
              <SectionTitle
                align="left"
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

      <div className="mt-24 md:mt-28 lg:mt-32">
        <SectionTitle
          infoType={infoType.toLowerCase()}
          sectionName="off-campus"
          sectionText="Off-Campus Housing"
        />
      </div>

      <div className="flex flex-col gap-48 md:gap-64 lg:gap-72 mt-8 md:mt-10 lg:mt-12">
        {/* On-Campus Housing */}

        {/* Sub Sections: Central + Hill + North */}
        {offCampusSections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div
              key={index}
              className="flex flex-col gap-6 md:gap-10 lg:gap-12"
            >
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
