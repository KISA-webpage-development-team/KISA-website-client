"use client";
import { useEffect, useState } from "react";
import { getPochaInfo } from "@/apis/pocha/queries";

// types
import { PochaInfo } from "@/types/pocha";
import { HookStatus } from "./types";
import { ApiError } from "@/lib/axios/types";

/**
 * @desc hook to fetch pocha information (getPochaInfo)
 */
const usePocha = () => {
  const [status, setStatus] = useState<HookStatus>("loading");
  const [pochaInfo, setPochaInfo] = useState<PochaInfo>();
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    // define fetchPochaInfo
    const fetchPochaInfo = async () => {
      // try API call first
      // try {
      //   const res = await getPochaInfo(new Date());
      //   setPochaInfo(res);
      //   setStatus("success");
      // } catch (error) {
      //   console.error("Error fetching like status: ", error);
      //   setStatus("error");
      // }

      const res = await getPochaInfo(new Date());

      if ((res as ApiError)?.statusCode) {
        setStatus("error");
        setError(res as ApiError);
      } else {
        setPochaInfo(res as PochaInfo);
        setStatus("success");
      }
    };
    // call fetchPochaInfo function
    fetchPochaInfo();
  }, []);

  return {
    pochaInfo,
    status,
    error,
  };
};

export default usePocha;
