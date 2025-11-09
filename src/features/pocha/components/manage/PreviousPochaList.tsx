import { HorizontalDivider } from "@/components/ui/divider";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { useEffect, useState } from "react";
import { getPreviousPochaList } from "@/apis/pocha/queries";
import React from "react";
import { HookStatus } from "@/types/hook";
import { PochaInfoWithoutStatus } from "@/types/pocha";
import PochaSummary from "./PochaSummary";

// const usePocha = () => {
//     const [status, setStatus] = useState<HookStatus>('loading');
//     const [pochaInfo, setPochaInfo] = useState<PochaInfo>();
//     const [error, setError] = useState<string>();

// useEffect(() => {
//   const fetchPochaInfo = async () => {
//     try {
//       const res = await getPochaInfo(new Date());
//       setPochaInfo(res);
//       setStatus('success');
//     } catch (error) {
//       // ✅ Error message directly from the error object
//       setStatus('error');
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unexpected error occurred.');
//       }
//     }
//   };

//   fetchPochaInfo();
// }, []);

//     return {
//       pochaInfo,
//       status,
//       error,
//     };
//   };

function PreviousPochaList() {
  // 1. fetch previous pocha info (GET /pocha/previous/)
  // useEffect...
  // START HERE!

  const [status, setStatus] = useState<HookStatus>("loading");
  const [previousPochaList, setPreviousPochaList] =
    useState<PochaInfoWithoutStatus[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPreviousPochaList = async () => {
      try {
        const res = await getPreviousPochaList(new Date());
        setPreviousPochaList(res);
        setStatus("success");
      } catch (error) {
        // ✅ Error message directly from the error object
        setStatus("error");
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchPreviousPochaList();
  }, []);

  if (status === "loading") {
    return <></>;
  }

  if (status === "error") {
    throw new Error(error);
  }

  // 2. render list of PochaSummary cards
  return (
    <div className="flex flex-col w-full gap-6">
      <h2 className={`${sejongHospitalBold.className} text-2xl`}>
        이전 포차 목록
      </h2>
      {/* TODO */}
      {previousPochaList?.map((pocha) => (
        <PochaSummary key={pocha.pochaID} pochaInfo={pocha} />
      ))}
      <HorizontalDivider />
    </div>
  );
}

export default PreviousPochaList;

// // map
// ARRAY.map((item) => {
//     // do something with item
//     return item*2
// })
