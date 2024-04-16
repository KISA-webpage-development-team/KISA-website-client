import React from "react";
import { birthDateFormatter } from "../../utils/dateFormatter";

// icons
import EmailIcon from "../ui/EmailIcon";
import GradIcon from "../ui/GradIcon";
import LinkedInIcon from "../ui/LinkedInIcon";

export default function UserBasicInfoRight({
  email,
  gradYear,
  bornDate,
  bornMonth,
  bornYear,
  linkedin,
}) {
  const born = birthDateFormatter(bornYear, bornMonth, bornDate);

  const userData = [
    {
      icon: <EmailIcon size="large" />,
      text: email,
    },
    {
      icon: <GradIcon />,
      text: "Class of " + gradYear,
    },
  ];

  const navigateToLinkedIn = () => {
    window.open(linkedin, "_blank");
  };

  return (
    <ul className="flex flex-col justify-center gap-2">
      {userData.map(({ icon, text }, index) => (
        <li key={index} className="flex items-center gap-4">
          {icon}
          <span className="text-base md:text-xl">{text}</span>
        </li>
      ))}

      {linkedin && (
        <div className="text-base md:text-xl flex items-center gap-4">
          <LinkedInIcon />
          <button className="hover:underline" onClick={navigateToLinkedIn}>
            {linkedin.split(".com/in/")[1].replace("/", "")}
          </button>
        </div>
      )}
    </ul>
  );
}
