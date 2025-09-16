import React, { useState } from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

import InfoAccordion from "./InfoAccordion";
import AccordionTabs from "./AccordionTabs";
import { usInfoContents, koreaInfoContents } from "../../data/infoContents";

const tabs = [
  { id: "korea", label: "한국" },
  { id: "usa", label: "미국" },
];

export default function JobApplicationInfoContents() {
  const [activeTab, setActiveTab] = useState("korea");
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className={`${sejongHospitalBold.className} text-2xl`}>
        미국·한국 취업 가이드북
      </h1>
      <p
        className={`${sejongHospitalLight.className} text-base text-center max-w-xl px-2`}
      >
        지원 시기부터 레쥬메와 네트워킹 전략까지, 인턴 준비의 기본기를 한눈에
        확인하세요. 또한 선배들의 실제 경험담과 리서치 지원 사례, 유학생이 꼭
        알아야 할 OPT·SSN 정보까지 담았습니다.
      </p>

      <AccordionTabs
        tabs={tabs}
        defaultActiveTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      <div className="w-full max-w-3xl px-4">
        <InfoAccordion
          infoContents={
            activeTab === "korea" ? koreaInfoContents : usInfoContents
          }
        />
      </div>
    </div>
  );
}
