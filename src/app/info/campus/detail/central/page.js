import React from "react";
import SectionTitle from "../../../../../components/Info/SectionTitle";

export default function CentralCampusDetail() {
  const infoType = "Campus";
  const sectionCentral = "central";
  const centralText = "Central Campus";

  return (
    <div className="flex justify-center">
      <SectionTitle
        infoType={infoType.toLowerCase()}
        sectionName={sectionCentral}
        sectionText={centralText}
      />
    </div>
  );
}
