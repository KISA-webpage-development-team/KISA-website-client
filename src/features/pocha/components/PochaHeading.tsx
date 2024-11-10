import React from "react";
import { getPochaInfo, getPochaInfoMock } from "@/apis/pocha/queries";

export default async function PochaHeading() {
  const pochaInfo = await getPochaInfoMock(new Date());
  // const pochaInfo = await getPochaInfo(new Date()); // When real api is completed, change to this line

  return (
    <div>
      {/* Title - pocha name */}
      <h1>{pochaInfo.title}</h1>

      {/* Description - pocha description */}
      <p>{pochaInfo.description}</p>
    </div>
  );
}
