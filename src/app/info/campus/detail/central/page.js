import Image from "next/image";
import React from "react";

// sub-ui components
import DetailThumbnail from "../../../../../components/Info/DetailThumbnail";
import DetailTitle from "../../../../../components/Info/DetailTitle";
import DetailDescription from "../../../../../components/Info/DetailDescription";

import { campusCentralData } from "../../../../../config/static/detailPageData";

export default function CentralCampusDetail() {
  return (
    <section
      className="flex flex-col items-center w-full 
    gap-24 sm:gap-32 md:gap-40 lg:gap-48 
    pb-24 sm:pb-28 md:pb-32 lg:pb-36"
    >
      {campusCentralData.map(({ id, title, desc }, _) => (
        <div id={id} key={id} className="flex flex-col w-full items-center ">
          {/* 1. Detail Thumbnail Image */}
          <DetailThumbnail id={id} />
          <div className="mt-8 md:mt-12 lg:mt-16 flex flex-col items-center gap-8 md:gap-12 lg:gap-16 w-full sm:px-16 md:px-28 lg:px-36">
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
