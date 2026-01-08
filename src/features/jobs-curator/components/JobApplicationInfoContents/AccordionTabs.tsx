import React, { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/utils/styles/cn";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

interface Tab {
  id: string;
  label: string;
}

interface AccordionTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

// TODO: consider moving this out to the global component
export default function AccordionTabs({
  tabs,
  defaultActiveTab,
  onTabChange,
  className,
}: AccordionTabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || ""
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div
      className={cn(
        `flex items-center gap-4 w-fit ${sejongHospitalBold.className}`,
        className
      )}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="default"
          className={cn(
            "rounded-full px-4 py-2 text-base font-medium transition-all",
            activeTab === tab.id
              ? "bg-michigan-blue text-white hover:bg-michigan-blue/50 hover:text-white outline-none"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-200 outline-none"
          )}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
