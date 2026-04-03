import PochaBackIcon from "@/components/ui/icon/PochaBackIcon";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { useRouter } from "next/navigation";
import React from "react";
import { POCHA_THEME } from "@/features/pocha/featureFlag";

interface PochaBackHeadingProps {
  title: string;
}

const headingColor =
  POCHA_THEME === "spring"
    ? "text-[#E8829B]"
    : "text-michigan-blue";

export default function PochaBackHeading({ title }: PochaBackHeadingProps) {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  return (
    <div className="flex items-center relative py-3">
      <button className="absolute left-3" onClick={handleBackButton}>
        <PochaBackIcon size="large" />
      </button>
      <h1
        className={`w-full
            ${sejongHospitalBold.className} text-xl text-center ${headingColor}`}
      >
        {title}
      </h1>
    </div>
  );
}
