import React from "react";
import DetailThumbnail from "../../../../../components/Info/DetailThumbnail";
import DetailTitle from "../../../../../components/Info/DetailTitle";
import DetailDescription from "../../../../../components/Info/DetailDescription";

import { sportsMiscSportsData } from "../../../../../config/static/detailPageData";

export default function MiscSportsPage() {
  return (
    <section className="detail_section">
      {sportsMiscSportsData.map(({ id, title, desc }, _) => (
        <div id={id} key={id} className="flex flex-col w-full items-center ">
          {/* 1. Detail Thumbnail Image */}
          <DetailThumbnail id={id} />
          <div
            className="flex flex-col items-center mt-8 md:mt-12 lg:mt-16
           gap-8 md:gap-12 lg:gap-16 w-full sm:px-16 md:px-28 lg:px-36"
          >
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
