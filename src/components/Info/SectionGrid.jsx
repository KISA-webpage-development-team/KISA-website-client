import React from "react";
import SectionImage from "../Info/SectionImage";

export default function SectionGrid({ infoType, sectionName, contentList }) {
  const sectionLink = `/info/${infoType}/detail/${sectionName}`;

  return (
    <div className="grid gap-y-16 md:gap-y-24 lg:gap-y-32">
      {contentList.map((_, index) => {
        if (index % 3 === 0) {
          return (
            <div
              key={index}
              className="flex w-full h-[400px] justify-center gap-x-4 md:gap-x-6 lg:gap-x-8"
            >
              {contentList.slice(index, index + 3).map(({ name, id }) => (
                <SectionImage
                  priority={index < 3}
                  key={id}
                  sectionLink={sectionLink}
                  name={name}
                  id={id}
                />
              ))}
            </div>
          );
        }
      })}
    </div>
  );
}
