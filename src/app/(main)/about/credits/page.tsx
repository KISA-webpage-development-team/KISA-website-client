"use client"; // NextUI Select와 useState를 사용하기 위해 클라이언트 컴포넌트로 지정

import React, { useState } from "react";
import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";

// 연도별 크레딧 데이터를 가져옵니다. 
// (실제 파일에 맞게 credits_2025 등의 이름으로 데이터를 분리해 주셔야 합니다!)
import {
  credits_2025,
  credits_2024,
  credits_2023,
} from "@/features/about-page/data/memberCreditData";

import { LinkedInIcon, EmailIcon, GitIcon } from "@/components/ui/icon";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

export default function CreditPage() {
  // 1. 연도별 데이터를 객체로 매핑
  const creditsData = {
    "25-26": credits_2025,
    "24-25": credits_2024,
    "23-24": credits_2023,
  };

  // 2. 연도 내림차순 정렬 (가장 최근 연도가 먼저 오도록)
  const sortedYears = Object.keys(creditsData).sort().reverse();

  // 3. 선택된 연도 상태 관리 (기본값: 가장 최근 연도)
  const [selectedYear, setSelectedYear] = useState(sortedYears[0]);

  // 4. 드롭다운 변경 핸들러
  const handleSelectChange = (keys: any) => {
    const value = keys.values().next().value;
    if (value === undefined) return;
    setSelectedYear(value);
  };

  // 5. 현재 선택된 연도의 멤버 리스트
  const selectedCredits = creditsData[selectedYear as keyof typeof creditsData] || [];

  return (
    <section
      className={`rounded-lg w-full bg-gradient-to-b from-gray-100 to-gray-200 
      pt-10 pb-5 px-4 sm:px-6 lg:px-8 ${sejongHospitalLight.className}`}
    >
      {/* 헤더 부분 */}
      <div className="flex flex-col items-center text-center">
        <h1
          className={`${sejongHospitalBold.className} text-3xl text-gray-900 sm:text-4xl`}
        >
          Credits
        </h1>
        <p className="mt-3 mx-auto text-gray-800 sm:text-xl md:mt-5">
          <span className={`${sejongHospitalBold.className}`}>
            umichkisa.com
          </span>{" "}
          was developed using{" "}
          <span className={`${sejongHospitalBold.className}`}>Next.js</span> +{" "}
          <span className={`${sejongHospitalBold.className}`}>
            Python Flask
          </span>
          .
        </p>
      </div>

      {/* 연도 선택 드롭다운 & 서브타이틀 영역 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 mb-4 gap-4">
        <h2
          className={`${sejongHospitalBold.className} text-xl sm:text-2xl text-gray-900`}
        >
          Contributors: {selectedYear}
        </h2>

        {/* MemberPage에서 가져온 NextUI Select 컴포넌트 */}
        <Select
          className="max-w-[150px]"
          classNames={{
            trigger: "border border-black px-4 py-2 !min-h-0",
            label: `${sejongHospitalLight.className} text-black text-lg hidden`,
            selectorIcon: "!w-5 !h-5",
            value: `${sejongHospitalLight.className} text-black text-lg`,
            listbox: `${sejongHospitalLight.className} text-black`,
          }}
          aria-label="Select Year"
          variant="bordered"
          radius="full"
          selectedKeys={new Set([selectedYear])}
          onSelectionChange={handleSelectChange}
        >
          {sortedYears.map((year) => (
            <SelectItem key={year}>{year}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Grid Style Cards Display (기존 디자인 유지) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedCredits.map((person: any, index: number) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300
            px-4 py-5 sm:p-6 flex flex-col gap-2 justify-between"
          >
            <div className="flex flex-col gap-1">
              <h3
                className={`${sejongHospitalBold.className} text-lg text-gray-900`}
              >
                {person.name}
              </h3>
              <p className=" text-gray-600">{person.email}</p>
              <p
                className={` font-medium text-michigan-light-blue ${sejongHospitalBold.className}`}
              >
                {person.role}
              </p>
              <p className="text-gray-700 mt-1 mb-2">{person.description}</p>
            </div>

            <div className="bottom-0 flex items-center space-x-4">
              {person.github && (
                <Link
                  href={person.github}
                  className="text-gray-600 hover:text-purple-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitIcon />
                </Link>
              )}
              {person.linkedin && (
                <Link
                  href={person.linkedin}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </Link>
              )}
              <Link
                href={`mailto:${person.email}`}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <EmailIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}