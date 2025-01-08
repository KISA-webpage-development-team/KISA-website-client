// [NOTE] Currently not in use

import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

export default function TipModal() {
  const [tipPercentage, setTipPercentage] = useState<string | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  const [isTipModalOpen, setIsTipModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  //   const handleTipSubmit = async () => {
  //     try {
  //       await updateTip();

  //       setIsTipModalOpen(false);
  //       // 5. process payment
  //       try {
  //         await processPay();
  //       } catch (error) {
  //         console.error("Error while processing payment", error);
  //       }
  //     } catch (error) {
  //       console.error("Error while updating tip", error);
  //     }

  //     setLoading(false);
  //   };

  /**
   * @desc Update Payment Intent with Tip
   */
  // const updateTip = async () => {
  //     // console.log("new Tip: ", tip);
  //     // fetch updated client secret from server
  //     fetch("/api/create-payment-intent", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: paymentIntentId,
  //         tip: parseFloat(tip.toFixed(2)),
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret));
  //   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">잠깐! 팁은 주고 가야지 ㅋㅋ</h2>
        <Select
          label="Choose a tip amount"
          selectedKeys={tipPercentage}
          onSelectionChange={(value) => {
            const selectedTip = Array.from(value)[0] as string;

            if (selectedTip === undefined) {
              console.log("tipPercentage: ", tipPercentage);
              return;
            }

            // setTipPercentage(value);
            setTip((amount * parseInt(selectedTip)) / 100);
          }}
          isRequired={true}
          className="w-full mb-4"
        >
          <SelectItem key="0">No Tip</SelectItem>
          <SelectItem key="15">15%</SelectItem>
          <SelectItem key="18">18%</SelectItem>
          <SelectItem key="20">20%</SelectItem>
        </Select>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setIsTipModalOpen(false);
              setLoading(false);
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (tip !== null) {
                // handleTipSubmit();
              }
            }}
            disabled={tip === null} // Disable button if no value is selected
            className={`px-4 py-2 rounded-lg ${
              tip !== null
                ? "bg-blue-500 text-white cursor-pointer"
                : "bg-gray-300 text-black cursor-not-allowed"
            }`}
          >
            Submit Tip
          </button>
        </div>
      </div>
    </div>
  );
}
