import React, { useEffect, useState } from "react";

import CustomInput from "../shared/CustomInput";
import CustomLabel from "../shared/CustomLabel";
import ErrorDisplay from "../shared/ErrorDisplay";

export default function RequiredFields({ name, setName, email, setEmail }) {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isEmailValid = email.endsWith("@umich.edu");
    if (!isEmailValid && email !== "") {
      setErrorMsg("유효한 미시간 이메일을 입력해주세요.");
      return;
    }

    if (isEmailValid) {
      setErrorMsg("");
      return;
    }
  }, [email]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full">
        <CustomLabel htmlFor="name" text="이름 (본명)" required />
        <CustomInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=""
          required
        />
        <ErrorDisplay
          state="alert"
          text="게시판에 사용될 이름입니다. 반드시 실명으로 작성해주세요."
        />
      </div>

      <div className="w-full">
        <CustomLabel htmlFor="email" text="umich 이메일" required />
        <CustomInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="예) jiohin@umich.edu"
          required
        />
        {errorMsg !== "" && <ErrorDisplay state="error" text={errorMsg} />}
      </div>
    </div>
  );
}
