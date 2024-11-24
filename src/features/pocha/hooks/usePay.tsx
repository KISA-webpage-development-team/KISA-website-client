import { PayInfo } from "@/types/pocha";
import { useEffect, useState } from "react";
import { getPayInfo, getPayInfoMock } from "@/apis/pocha/queries";

const usePay = (email: string, token: string, pochaID: number) => {
  const [payInfo, setPayInfo] = useState<PayInfo>();
  const [tip, setTip] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const fetchPayInfo = async () => {
      try {
        const res = await getPayInfo(email, pochaID, token);
        // const res = await getPayInfoMock(email, pochaID, token);

        setPayInfo(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching pay info: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      fetchPayInfo();
    }
  }, [email, pochaID, token]);

  const calculateFee = (amount: number) => {
    // calculate fee based on the amount
    return parseFloat((0.45 + amount * 0.029).toFixed(2));
  };

  const calculateTotalPrice = (amount: number) => {
    return amount + calculateFee(amount) + tip;
  };

  return {
    amount: payInfo?.amount,
    fee: calculateFee(payInfo?.amount),
    tip,
    setTip,
    totalPrice: calculateTotalPrice(payInfo?.amount),
    ageCheckRequired: payInfo?.ageCheckRequired === "true" ? true : false,
    status,
  };
};

export default usePay;
