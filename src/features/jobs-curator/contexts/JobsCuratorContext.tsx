import { createContext, useContext, useState } from "react";
import {
  EmploymentType,
  InternshipType,
  JobCategory,
  SupportedCountry,
} from "../types/jobs";
import { getDefaultInternshipDateRange } from "../utils/getDefaultDateRange";

// Date range type
type DateRangeState = {
  startDate: Date | undefined;
  setStartDate: (d: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (d: Date | undefined) => void;
};

type JobsCuratorState = {
  category: JobCategory | undefined;
  setCategory: (c: JobCategory | undefined) => void;
  selectedCountry: SupportedCountry;
  setSelectedCountry: (c: SupportedCountry) => void;
  employmentType: EmploymentType | undefined;
  setEmploymentType: (e: EmploymentType | undefined) => void;
  internshipTypes: InternshipType[];
  setInternshipTypes: (i: InternshipType[]) => void;
  startDate: Date | undefined;
  setStartDate: (d: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (d: Date | undefined) => void;
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

  // category header
  const [category, setCategory] = useState<JobCategory | undefined>(undefined);

  // tag filters
  // NOTE: business decision: default to experiential + convertible internship
  // although main target is experiential, there are not so many jobs right now
  const [employmentType, setEmploymentType] = useState<
    EmploymentType | undefined
  >("intern");
  const [internshipTypes, setInternshipTypes] = useState<InternshipType[]>([
    "experiential",
    "convertible",
  ]);

  // date range global state
  const defaultDateRange = getDefaultInternshipDateRange();
  const [startDate, setStartDate] = useState<Date | undefined>(
    defaultDateRange.start
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    defaultDateRange.end
  );

  return (
    <JobsCuratorContext.Provider
      value={{
        category,
        setCategory,
        selectedCountry,
        setSelectedCountry,
        employmentType,
        setEmploymentType,
        internshipTypes,
        setInternshipTypes,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
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
