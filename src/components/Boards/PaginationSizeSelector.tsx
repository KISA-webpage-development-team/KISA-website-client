import React, { useCallback } from "react";
import { Pagination as PaginationBar } from "@nextui-org/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const pageSizeOptions = [10, 20, 30];

type Props = {
  totalPageNum: number;
  pageNum: number;
  totalPostNum: number;
  pageSize: number;
};

export default function PaginationSizeSelector({
  totalPageNum,
  pageNum,
  totalPostNum,
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

  const handlePageChange = (page: number) => {
    router.push(pathname + "?" + createQueryString("page", page.toString()));
  };

  const handlePageSizeChange = (option) => {
    router.push(pathname + "?" + createQueryString("size", option));
  };

  return (
    <div className="relative flex justify-center w-full">
      <div
        className="absolute left-0 flex items-center w-20 gap-1
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
      <PaginationBar
        variant="light"
        showControls
        total={totalPageNum}
        page={pageNum}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
}
