import React, { useEffect, useState } from "react";
import { updateUser } from "../../service/user";
// sub-ui components
import CustomLabel from "../shared/CustomLabel";
import CustomInput from "../shared/CustomInput";

// major + gradYear + linkedin (optional)

export default function EditUserForm({
  major,
  setMajor,
  gradYear,
  setGradYear,
  linkedIn,
  setLinkedIn,
  emailid,
}) {
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      major,
      gradYear,
      linkedin: linkedIn === "" ? null : linkedIn,
    };

    const res = await updateUser(emailid + "@umich.edu", data);
    if (res) {
      alert("정보가 수정되었습니다");
      window.location.replace(`/users/${emailid}`);
      return;
    }
    alert("정보 수정에 실패했습니다");
  };
  return (
    <form className="flex flex-col gap-3 md:min-w-72" onSubmit={onSubmit}>
      {/* major */}
      <div className="w-full">
        <CustomLabel htmlFor="major" text="전공 (major)" required />
        <CustomInput
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder={major}
          required
        />
      </div>

      {/* gradYear */}
      <div className="w-full">
        <CustomLabel htmlFor="gradYear" text="졸업년도 (gradYear)" required />
        <CustomInput
          type="number"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          placeholder={gradYear}
          required
        />
      </div>

      {/* linkedIn: optional */}
      <div className="w-full">
        <CustomLabel htmlFor="linkedIn" text="LinkedIn" />
        <CustomInput
          type="text"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          placeholder={linkedIn}
        />
      </div>

      {/* submit button */}
      <button type="submit" className="w-full blue_button">
        제출
      </button>
    </form>
  );
}
