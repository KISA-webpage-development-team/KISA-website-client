import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

const countries = ["한국", "미국"];

export function CountryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("한국");

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
          <span className={`${sejongHospitalBold.className} text-1xl`}>
            {selectedCountry}
          </span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 min-w-32">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country}
            onClick={() => handleCountrySelect(country)}
            className={`${selectedCountry === country ? "bg-blue-50" : ""} ${
              sejongHospitalLight.className
            }`}
            selected={selectedCountry === country}
          >
            {country}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
