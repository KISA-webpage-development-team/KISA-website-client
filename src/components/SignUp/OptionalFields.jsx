import React from "react";
import CustomLabel from "../shared/CustomLabel";
import CustomInput from "../shared/CustomInput";

export default function OptionalFields({
  bornYear,
  setBornYear,
  major,
  setMajor,
  gradYear,
  setGradYear,
  linkedIn,
  setLinkedIn,
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full">
        <CustomLabel htmlFor="year" text="생년월일 (YYYY/MM/DD)" />
        <CustomInput
          type="text"
          value={bornYear}
          onChange={(e) => setBornYear(e.target.value)}
          placeholder=""
        />
      </div>
      <div className="w-full">
        <CustomLabel htmlFor="major" text="전공 (major)" />
        <CustomInput
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder=""
        />
      </div>

      <div className="w-full">
        <CustomLabel htmlFor="year" text="졸업년도" />
        <CustomInput
          type="number"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          placeholder=""
        />
      </div>

      <div className="w-full">
        <CustomLabel htmlFor="url" text="LinkedIn URL" />
        <CustomInput
          type="url"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          placeholder=""
        />
      </div>
    </div>
  );
}
