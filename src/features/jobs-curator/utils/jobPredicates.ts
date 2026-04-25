import { Job } from "../types/jobs";

export const isFulltime = (j: Job) => j.isFulltimePosition;
export const isIntern = (j: Job) => !j.isFulltimePosition;
export const isConvertibleIntern = (j: Job) =>
  isIntern(j) && j.isFulltimeConvertible;
export const isExperientialIntern = (j: Job) =>
  isIntern(j) && !j.isFulltimeConvertible;
export const isGlobalOnly = (j: Job) => j.isOnlyForInternationalUniversity;
