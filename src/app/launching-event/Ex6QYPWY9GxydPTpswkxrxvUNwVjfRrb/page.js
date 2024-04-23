import React from "react";

// 1. 당첨 문구

export default function FirstPlacePage() {
  return (
    <section className=" h-full flex flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl md:text-4xl font-bold">
        🎉🎉 1등에 당첨되셨습니다! 🎉🎉
      </h2>
      <p className="text-base md:text-xl">
        {`해당 페이지의 URL(주소)을 복사하여 "umichkisa@gmail.com"으로 보내주시면 최초 발견자에게 상품을 드립니다.`}
      </p>
    </section>
  );
}
