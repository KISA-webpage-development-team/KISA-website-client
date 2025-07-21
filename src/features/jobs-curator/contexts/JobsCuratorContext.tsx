import { createContext, useContext, useState } from "react";
import { SupportedCountry } from "../types/jobs";

type JobsCuratorState = {
  category: string | undefined;
  setCategory: (c: string | undefined) => void;
  selectedCountry: "한국" | "미국";
  setSelectedCountry: (c: "한국" | "미국") => void;
};

const JobsCuratorContext = createContext<JobsCuratorState | undefined>(
  undefined
);

export const JobsCuratorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCountry, setSelectedCountry] =
    useState<SupportedCountry>("한국");

  const [category, setCategory] = useState<string | undefined>(undefined);

  return (
    <JobsCuratorContext.Provider
      value={{ category, setCategory, selectedCountry, setSelectedCountry }}
    >
      {children}
    </JobsCuratorContext.Provider>
  );
};

export function useJobsCurator() {
  const ctx = useContext(JobsCuratorContext);
  if (!ctx)
    throw new Error("useJobsCurator must be used within JobsCuratorProvider");
  return ctx;
}
