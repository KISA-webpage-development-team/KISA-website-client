import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getPochaInfo, getPochaInfoMock } from "@/apis/pocha/queries";

export default function PochaHeading() {
  // page.tsx는 CSR이기에 PochaHeading도 CSR --> async/await 못함
  // getPochaInfoMock만 부분적으로 async (await하려면 async)
  // const fetchPochaInfo = async () => {
  //   const pochaInfo = await getPochaInfoMock(new Date());
  //   console.log("pochaInfo", pochaInfo);
  // };

  // const pochaInfo = await getPochaInfo(new Date()); // When real api is completed, change to this line
  const [pochaInfo, setPochaInfo] = useState(undefined);

  useEffect(() => {
    // define fetchPochaInfo
    const fetchPochaInfo = async () => {
      // try API call first
      try {
        const res = await getPochaInfoMock(new Date());
        setPochaInfo(res);
        // If not
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };
    // call fetchPochaInfo function
    fetchPochaInfo();
  }, []);

  return (
    <div>
      {/* Title - pocha name */}
      <h1>{pochaInfo?.title}</h1>

      {/* Description - pocha description */}
      <p>{pochaInfo?.description}</p>
    </div>
  );
}
