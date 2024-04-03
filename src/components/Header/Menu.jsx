"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";

const menu = [
  {
    name: "KISA",
    href: "/about",
    dropdowns: [
      {
        name: "About KISA",
        href: "/about/kisa",
      },
      {
        name: "학생회 조직도",
        href: "/about/members",
      },
      {
        name: "활동 소개",
        href: "/about/events",
      },
      {
        name: "회칙",
        href: "/about/rule",
      },
    ],
  },
  {
    name: "정보",
    href: "/info",
    dropdowns: [
      {
        name: "처음와서 할 일",
        href: "/info/checklist",
      },
      {
        name: "캠퍼스 정보",
        href: "/info/campus",
      },
      {
        name: "하우징",
        href: "/info/housing",
      },
      {
        name: "여행",
        href: "/info/travel",
      },
      {
        name: "스포츠",
        href: "/info/sports",
      },
      {
        name: "맛집",
        href: "/info/restaurants",
      },
    ],
  },

  {
    name: "게시판",
    href: "/boards",
    dropdowns: [
      {
        name: "공지사항",
        href: "/boards/announcement",
      },
      {
        name: "자유게시판",
        href: "/boards/community",
      },
      {
        name: "채용공고",
        href: "/boards/job",
      },
      {
        name: "Alumni",
        href: "/boards/alumni",
      },
      {
        name: "KISA 스폰서",
        href: "/boards/sponsor",
      },
    ],
  },
];

export default function Menu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleDropdownClick = (idx) => {
    if (dropdownIndex === idx) {
      setShowDropdown(!showDropdown);
    } else {
      setShowDropdown(true);
      setDropdownIndex(idx);
    }
  };

  return (
    <div className="flex gap-8">
      {menu.map(({ name, dropdowns }, idx) => (
        <div className="relative" key={idx}>
          <button
            onMouseEnter={() => handleDropdownClick(idx)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <p className="cursor-pointer text-black hover:text-gray-600">
              {name}
            </p>

            {dropdowns && dropdownIndex === idx && showDropdown && (
              <div className="absolute w-48 top-full left-0 bg-white shadow-lg rounded-lg py-2 ">
                {dropdowns.map(({ name, href }) => (
                  <Link key={href} href={href}>
                    <p className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-left">
                      {name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </button>
        </div>
      ))}
      {/* <Link key={"/contact"} href={"/contact"}>
        <p className="cursor-pointer text-black hover:text-gray-600">
          {"CONTACT"}
        </p>
      </Link> */}
    </div>
  );
}
