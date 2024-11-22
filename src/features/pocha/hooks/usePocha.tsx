"use client";

import { getPochaInfo } from "@/apis/pocha/queries";
import { PochaInfo } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch pocha information (getPochaInfo)
 */
const usePocha = () => {
  const [status, setStatus] = useState<string>("loading");
  const [pochaInfo, setPochaInfo] = useState<PochaInfo>(undefined);

  useEffect(() => {
    // define fetchPochaInfo
    const fetchPochaInfo = async () => {
      // try API call first
      try {
        const res = await getPochaInfo(new Date());
        setPochaInfo(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching like status: ", error);
        setStatus("error");
      }
    };
    // call fetchPochaInfo function
    fetchPochaInfo();
  }, []);

  return {
    pochaInfo,
    status,
  };
};

export default usePocha;
