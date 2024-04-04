import React from "react";
import SectionImage from "../Info/SectionImage";

export default function SectionGrid({ infoType, sectionName, contentList }) {
  const sectionLink = `/info/${infoType}/detail/${sectionName}`;

  return (
    <>
      <div className="hidden md:grid gap-y-16 md:gap-y-24 lg:gap-y-32">
        {contentList.map((_, index) => {
          if (index % 3 === 0) {
            return (
              <div
                key={index}
                className="flex w-full md:h-[250px] lg:h-[320px] xl:h-[380px] justify-center gap-x-4 md:gap-x-6 lg:gap-x-8"
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
      <div className="grid md:hidden gap-y-12 sm:gap-y-16 md:gap-y-24 lg:gap-y-32">
        {contentList.map((_, index) => {
          if (index % 2 === 0) {
            return (
              <div
                key={index}
                className="flex w-full h-[165px] sm:h-[260px] justify-center gap-x-4 md:gap-x-6 lg:gap-x-8"
              >
                {contentList.slice(index, index + 2).map(({ name, id }) => (
                  <SectionImage
                    priority={index < 2}
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
    </>
  );
}
