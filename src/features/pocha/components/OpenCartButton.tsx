import React from "react";

interface PochaCartButtonProps {
  setOpenCartPage: (openCartPage: boolean) => void;
}

export default function OpenCartButton({
  setOpenCartPage,
}: PochaCartButtonProps) {
  const handleCartClick = () => {
    setOpenCartPage(true);
  };

  return (
    <button
      className="flex justify-center mt-4 bg-blue-500 text-white px-4 py-2 font-semibold"
      onClick={handleCartClick}
    >
      View Cart
    </button>
  );
}
