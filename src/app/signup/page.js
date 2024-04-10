"use client";

// sign up form
// 이름 + 미시간 이메일

// (optional) 전공 + 출생년도 +  졸업년도 + LinkedIn URL

import React, { useEffect, useState } from "react";
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

export default function SignUpPage() {
  const router = useRouter();

  // form states
  const [name, setName] = useState(""); // user input 한글 이름
  const [email, setEmail] = useState(""); // user input 이메일
  const [termChecked, setTermChecked] = useState(false); // user input 개인정보 수집 약관 동의 [checkbox

  // optional fields
  const [major, setMajor] = useState(""); // user input 전공
  const [bornYear, setBornYear] = useState(""); // user input 출생년도 [optional
  const [gradYear, setGradYear] = useState(""); // user input 졸업년도
  const [linkedIn, setLinkedIn] = useState(""); // user input linkedIn URL

  // form validity
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // form validity check
  useEffect(() => {
    if (!termChecked) {
      setDisabled(true);
      return;
    }

    const isEmailValid = email.endsWith("@umich.edu");

    if (!isEmailValid) {
      setErrorMsg("유효한 미시간 이메일을 입력해주세요.");
      setDisabled(true);
      return;
    }

    if (name === "") {
      setDisabled(true);
      return;
    }

    if (isEmailValid && name.length > 0 && termChecked) {
      setErrorMsg("");
      setDisabled(false);
      return;
    }
  }, [name, email, termChecked]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      email: email,
    };

    // const userData = {
    //   name: name,
    //   email: email,
    //   bornYear: bornYear ? bornYear : null,
    //   major: major ? major : null,
    //   gradYear: gradYear ? gradYear : null,
    //   linkedIn: linkedIn ? linkedIn : null,
    // };

    const userConfirmed = window.confirm(
      "한 번 생성된 로그인 정보 수정은 어렵습니다. 진행하시겠습니까?"
    );

    if (!userConfirmed) {
      return;
    }

    console.log("data submitted", userData);

    //   // send /auth/signup api call to create a new user

    const url = `${backendUrl}/auth/signup/`;
    try {
      const res = await axios.post(url, userData);
      if (res.status === 201) {
        console.log("Successfully created a new user!");
        // redirect to home
        console.log(name);
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
    max-w-sm h-full mx-auto
    mt-12 md:mt-20 lg:mt-28"
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
        className="flex flex-col gap-4 items-center w-full px-4"
      >
        {/* required inputs: 이름 + 미시간 이메일 */}
        <RequiredFields
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />

        {/*  divider  */}
        <HorizontalDivider color="gray" />

        {/* optional inputs: 전공 + 졸업년도 + linkedIn */}
        <OptionalFields
          bornYear={bornYear}
          setBornYear={setBornYear}
          major={major}
          setMajor={setMajor}
          gradYear={gradYear}
          setGradYear={setGradYear}
          linkedIn={linkedIn}
          setLinkedIn={setLinkedIn}
        />

        <TermConditions
          termChecked={termChecked}
          setTermChecked={setTermChecked}
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
