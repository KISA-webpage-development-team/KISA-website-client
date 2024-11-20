import React from "react";

type PochaCartProps = {
  params: {
    email: string;
    pochaid: number;
  };
};

export default function OpenCartButton({ params }: PochaCartProps) {
  const handleCartClick = () => {
    const queryParams = `email=${params.email}&pochaid=${params.pochaid}`;
    window.location.href = "/pocha/cart?${queryParams)";
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
