import { useEffect, useState } from "react";
import { HookStatus } from "@/types/hook";
import { getJobsMock } from "@/apis/jobs/queries";
import { Job } from "../types/jobs";

// TODO: change it to use real API endpoint
const useJobs = () => {
  const [status, setStatus] = useState<HookStatus>("loading");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobsMock();
        // setJobs(res?.data); // NOTE: uncomment when using a real data
        setJobs(res?.jobs);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchJobs();
  }, []);

  return { jobs, status, error };
};

export default useJobs;
