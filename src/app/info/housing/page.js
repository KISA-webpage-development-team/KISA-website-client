import React from "react";
import InfoTitle from "../../../components/shared/InfoTitle";

import SectionGrid from "../../../components/Info/SectionGrid";
import SectionTitle from "../../../components/Info/SectionTitle";

export default function HousingPage() {
  const infoType = "Housing";

  const sectionOnCampus = "On-Campus Housing";
  const onCampusText = "On-Campus Housing";
  const onCampusContents = [];

  const sectionCentral = "Central Campus";
  const centralText = "Central Campus";
  const centralContents = [];

  const sectionHill = "Hill Area";
  const hillText = "Hill Area";

  const sectionNorth = "North Campus";
  const northText = "North Campus";

  const sectionOffCampus = "Off-Campus Housing";
  const offCampusText = "Off-Campus Housing";
  const offCampusContents = [];

  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
pb-[100px] md:pb-[125px] lg:pb-[150px]"
    >
      {/* Information title section divider */}
      <InfoTitle infoType={infoType} />
      {/* Sections: On Campus + Off Campus */}
      <div className="flex flex-col gap-48 md:gap-64 lg:gap-72 mt-8 md:mt-10 lg:mt-12">
        {/* On-Campus Housing */}
        <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 bg-yellow-300">
          <SectionTitle
            infoType={infoType.toLowerCase()}
            sectionName={sectionOnCampus}
            sectionText={onCampusText}
          />
          {/* Sub Sections: Central + Hill + North */}
          {/* Central Campus */}

          {/* Hill Campus */}

          {/* North Campus */}
        </div>
        {/* Off-Campus Housing */}
        <div className="flex flex-col gap-6 md:gap-10 lg:gap-12">
          <SectionTitle
            infoType={infoType.toLowerCase()}
            sectionName={sectionOffCampus}
            sectionText={offCampusText}
          />
          <SectionGrid
            infoType={infoType.toLowerCase()}
            sectionName={sectionOffCampus}
            contentList={offCampusContents}
          />
        </div>
      </div>
    </section>
  );
}
