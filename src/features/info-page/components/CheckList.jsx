import React from "react";
import { checkListData } from "@/features/info-page/data/checkListPageData";
import CheckListItem from "@/features/info-page/components/CheckListItem";

export default function CheckList() {
  return (
    <ul className="w-full flex flex-col gap-6">
      {checkListData.map(({ title, desc }, index) => (
        <li key={index}>
          <CheckListItem title={title} desc={desc} index={index + 1} />
        </li>
      ))}
    </ul>
  );
}
