"use client";

import React, { useState } from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

import HorizontalDivider from "../shared/HorizontalDivider";
import PlusIcon from "../ui/PlusIcon";
import MinusIcon from "../ui/MinusIcon";

export default function CheckListItem({ title, desc, index }) {
  const [isOpened, setIsOpened] = useState(false);

  const accordionContentStyles = isOpened
    ? "py-6 max-h-[1000px] transition-max-height duration-300 ease"
    : "max-h-0 overflow-hidden transition-max-height duration-300 ease";

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        {/* left: index. title */}
        <div
          onClick={handleClick}
          className={`text-left ${sejongHospitalBold.className} cursor-pointer 
       ${
         isOpened
           ? "text-michigan-blue"
           : "hover:text-michigan-maize text-michigan-blue"
       }
          text-2xl`}
        >{`${index}. ${title}`}</div>
        {/* right: plus / minus icon */}

        {isOpened ? (
          <button className="cursor-pointer" onClick={() => setIsOpened(false)}>
            <MinusIcon />
          </button>
        ) : (
          <button className="cursor-pointer" onClick={() => setIsOpened(true)}>
            <PlusIcon />
          </button>
        )}
      </div>

      {/* content */}

      <div
        className={`${sejongHospitalLight.className} text-xl pr-16 
          ${accordionContentStyles}`}
      >
        {desc}
      </div>

      {/* divider */}
      <div className="mt-4 w-full">
        <HorizontalDivider color="dark" />
      </div>
    </div>
  );
}
