import { Job } from "../types/jobs";

// list of jobs from umichkisa.com/boards/job-announcement 취업공고 게시판
// TODO: need to move them to the DB in the future
// and let non-developers to add jobs by themselves
const kisaJobs: Job[] = [
  {
    jobID: 1,
    company: "LX Hausys (Formerly: LG Hausys)",
    position: "Finance Associate or Specialist",
    startDate: undefined,
    endDate: undefined,
    dueDate: undefined,
    link: "https://www.umichkisa.com/posts/491",
    isFulltimePosition: true,
    isFulltimeConvertible: false,
    isOnlyForInternationalUniversity: false,
    source: "kisa",
  },
];

export default kisaJobs;
