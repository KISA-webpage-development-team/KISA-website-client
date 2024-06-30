// [TEST] for Next-Auth Middleware functionality

import React, { useEffect } from "react";
import NotLoginModal from "../../components/shared/NotLoginModal";

export default function page({ searchParams }) {
  const { callbackUrl } = searchParams;

  return (
    <section>
      <span className="md:text-lg self-center font-bold text-michigan-blue">
        UMich 구글 이메일 계정을 사용해주세요. 외부 이메일 사용시 서비스 이용이
        제한될 수 있습니다.
      </span>
      {(callbackUrl || decodeURIComponent(callbackUrl).endsWith("com/")) && (
        <NotLoginModal />
      )}
    </section>
  );
}
