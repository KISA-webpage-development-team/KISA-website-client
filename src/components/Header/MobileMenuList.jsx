import React, { useState } from "react";
import menu from "../../config/NavigationMenu";
import Link from "next/link";

export default function MobileMenuList() {
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
    <div className="flex flex-col items-start gap-8">
      {menu.map(({ name, dropdowns }, idx) => (
        <div className="relative" key={idx}>
          <button
            onMouseEnter={() => handleDropdownClick(idx)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <p
              className="text-left cursor-pointer
             text-michigan-blue hover:text-gray-600"
            >
              {name}
            </p>

            {dropdowns && dropdownIndex === idx && showDropdown && (
              <div className="w-48 top-full left-0 py-2 ">
                {dropdowns.map(({ name, href }) => (
                  <Link key={href} href={href}>
                    <p className="cursor-pointer text-michigan-blue px-3 py-2 text-left">
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
