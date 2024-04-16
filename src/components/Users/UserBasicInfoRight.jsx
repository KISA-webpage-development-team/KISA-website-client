import React from "react";
import { birthDateFormatter } from "../../utils/dateFormatter";

// icons
import EmailIcon from "../ui/EmailIcon";
import GradIcon from "../ui/GradIcon";
import LinkedInIcon from "../ui/LinkedInIcon";
import Link from "next/link";

export default function UserBasicInfoRight({
  email,
  gradYear,
  linkedin,
  canEdit,
}) {
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
    <ul className="flex flex-col justify-center gap-2 md:min-w-72">
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

      {
        // edit button
        canEdit && (
          <Link
            href={`/users/edit/${email.split("@")[0]}`}
            className="mt-1 backdrop:self-center md:self-start md:w-[40%] blue_button"
          >
            정보 수정
          </Link>
        )
      }
    </ul>
  );
}
