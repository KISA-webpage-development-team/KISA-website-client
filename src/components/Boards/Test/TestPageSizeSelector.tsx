import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const pageSizeOptions = [10, 20, 30];

type Props = {
  totalPostNum: number;
  pageNum: number;
  pageSize: number;
};

export default function TestPageSizeSelector({
  totalPostNum,
  pageNum,
  pageSize,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageSizeChange = (option) => {
    router.push(pathname + "?" + createQueryString("size", option));
  };

  return (
    <div
      className="flex items-center w-20 gap-1
    ml-2 md:ml-0"
    >
      {pageSizeOptions
        .filter((pageSizeOption) => pageNum * pageSizeOption <= totalPostNum)
        .map((pageSizeOption) => (
          <button
            key={pageSizeOption}
            className={`w-8 h-8 border border-gray-300 rounded-lg px-2 flex items-center justify-center ${
              pageSizeOption === pageSize
                ? "bg-michigan-blue text-michigan-maize"
                : ""
            }`}
            onClick={() => handlePageSizeChange(pageSizeOption)}
          >
            {pageSizeOption}
          </button>
        ))}
    </div>
  );
}
