// - page routing (내장 기능)
// - 각 페이지의 렌더링 방식을 결정
// - page.tsx에서 얻을 수 있는 정보에 대한 처리 (params, session, query, pathname)
// - page.tsx에서 함수이름은 [Main Feature]Page로 통일

// [Rendering method] SSR (container) + CSR (components)
import { authOptions } from "@/config/auth";
import { UserBoard, UserProfile } from "@/refactor_src/features/user-view";
import { getServerSession } from "next-auth";
import React from "react";

type PageProps = {
  params: {
    email: string;
  };
};

export default async function UserViewPage({ params }: PageProps) {
  // 뭔가 이 페이지에서 session을 아래처럼 가져오는게 아니라,
  // header에서 한 번 가져오기만 해도 될 것 같은데, Context로 저장해놓고 필요할 때마다 가져오는 식으로
  const session = await getServerSession(authOptions);

  // url의 email은 똥값이 섞여있을 수 있다.
  // decodeURIComponent로 정상적인 값으로 변환
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  // const data = await getUser(decodedEmail, session?.token);

  // console.log("data: ", data);

  return (
    <section className="bg-yellow-200">
      <UserProfile email={decodedEmail} token={session?.token} />
      <UserBoard />
    </section>
  );
}
