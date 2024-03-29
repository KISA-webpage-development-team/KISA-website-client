import React from "react";
import DetailThumbnail from "../../../../../components/Info/DetailThumbnail";
import DetailTitle from "../../../../../components/Info/DetailTitle";
import DetailDescription from "../../../../../components/Info/DetailDescription";
import { housingOnCampusData } from "../../../../../config/static/detailPageData";

export default function OnCampusHousingDetail() {
  return (
    <section className="flex flex-col items-center w-full gap-48 pb-36">
      {housingOnCampusData.map(({ id, title, desc }, _) => (
        <div id={id} key={id} className="flex flex-col w-full items-center ">
          {/* 1. Detail Thumbnail Image */}
          <DetailThumbnail id={id} />
          <div className="mt-12 flex flex-col items-center gap-16 w-full px-36">
            {/* 2. Detail Section Title */}
            <DetailTitle title={title} />
            {/* 3. Detail Section Description  */}
            <DetailDescription desc={desc} />
          </div>
        </div>
      ))}
    </section>
  );
}
