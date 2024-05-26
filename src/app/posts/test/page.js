"use client";

// Let's make this whole page client-side rendered
// 개같이 실패함.
// 아무래도 page 자체는 CSR이 아닌 SSR로 렌더링하는게 맞는 것 같다.
// 아무리 그 안의 component들이 CSR이더라도, SSR로 페이지 레이아웃을 로딩하지 않을 이유가 없다.
// 서버에 과부하 따위 오지 않을 것 같다.

import React, { useEffect, useState } from "react";
// import BoardTitle from "../../../components/Boards/BoardTitle";
// import Editor from "../../../components/Posts/Editor";

export default function CreatePostTestPage() {
  const [tmp, setTmp] = useState(0);
  useEffect(() => {
    // Client-side data fetching or any side effects can be handled here
    console.log("This runs on the client side");
  }, []);
  return (
    <section>
      {/* Board Title (지금 어떤 보드에 대한 게시물을 쓰는지 확인위해) */}
      {/* <BoardTitle boardType="community" /> */}
      {/* Text Editor */}
      {/* <div className="grow h-full">
        <Editor boardType="community" />
      </div> */}
      wow
    </section>
  );
}
