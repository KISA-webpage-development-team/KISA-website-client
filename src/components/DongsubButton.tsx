"use client";
import { useState } from "react";

// 몰라도됨

export default function DongsubButton() {
  // useState: state르ㄹ 관리하는 특별한 리액트 함수
  const [num, setNum] = useState(1);

  function handleOnClick() {
    setNum(num + 1);
    console.log("num: ", num);
  }

  // = () => {

  // }

  // () {

  // }

  const name = "버튼";

  return (
    <div>
      <button onClick={handleOnClick}>{name}</button>
      <p>{num}</p>
    </div>
  );
}

// Rendering   ----   Function Call
