"use client"; // 몰라도됨

export default function DongsubButton() {
  function handleOnClick() {
    console.log("Click!");
  }

  const name = "버튼";

  return <button onClick={handleOnClick}>{name}</button>;
}
