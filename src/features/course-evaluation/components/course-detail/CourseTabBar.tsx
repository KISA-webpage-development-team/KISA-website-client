"use client";

import React from "react";

export type CourseTab = "리뷰" | "족보";

const TABS: CourseTab[] = ["리뷰", "족보"];

type CourseTabBarProps = {
  activeTab: CourseTab;
  onTabChange: (tab: CourseTab) => void;
};

export default function CourseTabBar({
  activeTab,
  onTabChange,
}: CourseTabBarProps) {
  return (
    <div className="flex border-b border-gray-200">
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        const tabClassName = isActive
          ? "px-5 py-2.5 text-sm font-medium transition-colors border-b-2 border-michigan-blue text-michigan-blue"
          : "px-5 py-2.5 text-sm font-medium transition-colors text-gray-400 hover:text-gray-600";
        return (
          <button key={tab} onClick={() => onTabChange(tab)} className={tabClassName}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}
