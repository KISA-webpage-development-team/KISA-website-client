import React from "react";

type PochaCartProps = {
  pochaid: number;
};

//
// { pochaInfo }: PochaHeadingProps
export default function OpenCartButton({ pochaid }: PochaCartProps) {
  const handleCartClick = () => {
    const queryParams = `pochaid=${pochaid}`;
    window.location.href = `/pocha/cart?${queryParams}`;
  };

  return (
    <button
      className="w-full flex justify-center mt-4 bg-blue-500 text-white px-4 py-2 font-semibold"
      onClick={handleCartClick}
    >
      View Cart
    </button>
  );
}
