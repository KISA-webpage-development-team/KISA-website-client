// - page routing (내장 기능)
// - 각 페이지의 렌더링 방식을 결정
// - page.tsx에서 얻을 수 있는 정보에 대한 처리 (params, session, query, pathname)
// - page.tsx에서 함수이름은 [Main Feature]Page로 통일

// [Rendering method] SSR (container) + CSR (components)
// [Auth Middleware applied]
import React from "react";
import { UserBoard, UserProfile } from "@/refactor_src/features/user-view";
import { NotAuthorized } from "@/refactor_src/shared/@common";
import { KISA_EMAIL } from "@/final_refactor_src/constants/email";
import { getSession } from "@/final_refactor_src/lib/next-auth/getSession";

type PageProps = {
  params: {
    email: string;
  };
};

export default async function UserViewPage({ params }: PageProps) {
  const session = await getSession();
  // url의 email은 똥값이 섞여있을 수 있다.
  // decodeURIComponent로 정상적인 값으로 변환
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  // [Business Logic]: KISA 이메일로만 KISA의 프로필을 확인
  if (
    decodedEmail.includes(KISA_EMAIL) &&
    !session?.user?.email.includes(KISA_EMAIL)
  ) {
    return <NotAuthorized />;
  }

  if (!session) {
    return <></>;
  }

  return (
    <section>
      <UserProfile email={decodedEmail} session={session} />
      <UserBoard email={decodedEmail} session={session} />
    </section>
  );
}
