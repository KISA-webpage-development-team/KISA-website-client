"use client";

// sign up form
// 이름 + 미시간 이메일

// (optional) 전공 + 출생년도 +  졸업년도 + LinkedIn URL

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { backendUrl } from "../../config/backendUrl";

// sub-ui components
import RequiredFields from "../../components/SignUp/RequiredFields";
import OptionalFields from "../../components/SignUp/OptionalFields";
import HorizontalDivider from "../../components/shared/HorizontalDivider";
import TermConditions from "../../components/SignUp/TermConditions";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

import { personalInfoTerm } from "../../config/termCondition";
import { websiteTerm } from "../../config/termCondition";

export default function SignUpPage() {
  const router = useRouter();

  // form states
  const [name, setName] = useState(null); // user input 한글 이름
  const [email, setEmail] = useState(null); // user input 이메일
  const [major, setMajor] = useState(null); // user input 전공
  const [bornDate, setBornDate] = useState(null); // user input 출생년도
  const [gradYear, setGradYear] = useState(null); // user input 졸업년도

  // term conditions
  const [personTermScroll, setPersonTermScroll] = useState(false); // 개인정보 수집 약관 스크롤 [boolean]
  const [personTermChecked, setPersonTermChecked] = useState(false); // 개인정보 수집 약관 동의 [checkbox]
  const [websiteTermScroll, setWebsiteTermScroll] = useState(false); // 웹사이트 이용 약관 스크롤 [boolean]
  const [websiteTermChecked, setWebsiteTermChecked] = useState(false); // 웹사이트 이용 약관 동의 [checkbox]

  // optional fields
  const [linkedIn, setLinkedIn] = useState(null); // user input linkedIn URL

  // form validity
  const [disabled, setDisabled] = useState(true);

  // required fields
  const requiredFields = useMemo(
    () => [
      {
        value: name,
        setValue: setName,
        label: "이름 (본명)",
        type: "text",
        isError: true,
        errorMsg: "게시판에 사용될 이름입니다. 반드시 실명으로 작성해주세요.",
        errorState: "alert",
      },
      {
        value: email,
        setValue: setEmail,
        label: "umich 이메일",
        type: "email",
        isError:
          (!email?.endsWith("@umich.edu") && email?.length > 0) ||
          email?.length === 0,
        errorMsg: "유효한 미시간 이메일을 입력해주세요.",
        errorState: "error",
      },
      {
        value: major,
        setValue: setMajor,
        label: "전공 (major)",
        type: "text",
        isError: major?.length === 0,
        errorMsg: "전공을 입력해주세요.",
        errorState: "error",
      },
      {
        value: bornDate,
        setValue: setBornDate,
        label: "생년월일 (YYYY/MM/DD)",
        type: "date",
        isError: bornDate !== null && bornDate?.length !== 10,
        errorMsg: "출생년도를 입력해주세요.",
        errorState: "error",
      },
      {
        value: gradYear,
        setValue: setGradYear,
        label: "졸업년도 (YYYY)",
        type: "number",
        isError: gradYear !== null && gradYear?.length !== 4,
        errorMsg: "정확한 졸업년도를 입력해주세요.",
        errorState: "error",
      },
    ],
    [name, email, major, bornDate, gradYear]
  );

  const optionalFields = [
    {
      value: linkedIn,
      setValue: setLinkedIn,
      label: "LinkedIn URL",
      type: "url",
      errorState: "none",
    },
  ];

  // form validity check
  useEffect(() => {
    // term condition check
    if (!personTermChecked || !websiteTermChecked) {
      setDisabled(true);
      return;
    }

    // additional error check on name
    const isNameValid = name?.length > 0;
    if (!isNameValid) {
      setDisabled(true);
      return;
    }

    for (const field of requiredFields) {
      if (
        (field.errorState === "error" && field.isError) ||
        field.value === null
      ) {
        setDisabled(true);
        return;
      }
    }
    setDisabled(false);
  }, [requiredFields, name, personTermChecked, websiteTermChecked]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      fullname: name,
      email: email,
      bornYear: bornDate.split(".")[0] ? bornDate.split(".")[0] : null,
      bornDate: bornDate.split(".")[2] ? bornDate.split(".")[2] : null,
      bornMonth: bornDate.split(".")[1] ? bornDate.split(".")[1] : null,
      major: major ? major : null,
      gradYear: gradYear ? gradYear : null,
      linkedin: linkedIn ? linkedIn : null,
    };

    const userConfirmed = window.confirm(
      "한 번 생성된 로그인 정보 수정은 어렵습니다. 진행하시겠습니까?"
    );

    if (!userConfirmed) {
      return;
    }

    //   // send /auth/signup api call to create a new user

    const url = `${backendUrl}/auth/signup/`;
    try {
      const res = await axios.post(url, userData);
      if (res.status === 201) {
        // redirect to home
        return router.push(`/signup/${name}`);
      }
      // add error notification
      return;
    } catch (err) {
      console.log(err);
      // add error notification
      return;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-10
    max-w-sm h-full mx-auto mb-20"
    >
      <div className="flex flex-col text-center gap-1 items-center">
        <h1 className={`${sejongHospitalBold.className} text-2xl`}>
          키사에 처음 오신걸 환영합니다!
        </h1>
        <h2 className={`${sejongHospitalLight.className}`}>
          회원가입을 위해 아래 정보를 입력해주세요.
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col 
        gap-6 md:gap-8
         items-center w-full px-4"
      >
        {/* required inputs */}
        <RequiredFields fields={requiredFields} />

        {/*  divider  */}
        <HorizontalDivider color="gray" />

        {/* optional inputs: linkedIn */}
        <OptionalFields fields={optionalFields} />

        {/* 개인정보수집약관 */}
        <TermConditions
          isScrolledToBottom={personTermScroll}
          setIsScrolledToBottom={setPersonTermScroll}
          label={personalInfoTerm.label}
          text={personalInfoTerm.text}
          checkboxLabel={personalInfoTerm.checkboxLabel}
          termChecked={personTermChecked}
          setTermChecked={setPersonTermChecked}
        />
        {/* 웹사이트 이용약관 */}
        <TermConditions
          isScrolledToBottom={websiteTermScroll}
          setIsScrolledToBottom={setWebsiteTermScroll}
          label={websiteTerm.label}
          text={websiteTerm.text}
          checkboxLabel={websiteTerm.checkboxLabel}
          termChecked={websiteTermChecked}
          setTermChecked={setWebsiteTermChecked}
        />

        {disabled ? (
          <button
            type="submit"
            disabled
            className="w-full disabled_blue_button"
          >
            제출
          </button>
        ) : (
          <button type="submit" className="w-full blue_button">
            제출
          </button>
        )}
      </form>
    </div>
  );
}
