"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "@umichkisa-ds/web";

import { BACKEND_URL } from "@/constants/env";

export type SignupPayload = {
  fullname: string;
  email: string;
  bornYear: number;
  bornMonth: number;
  bornDate: number;
  major: string | null;
  gradYear: number | null;
  linkedin: string | null;
};

const PRECHECK_ERROR =
  "회원가입 확인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
const SUBMIT_ERROR = "회원가입에 실패했습니다.";
const SUBMIT_NETWORK_ERROR =
  "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";

/**
 * Owns the two-step signup lifecycle:
 *   1. `precheck(email)` — GET /auth/userExists/. 404 → open confirm Dialog,
 *      200 → open already-exists Dialog, anything else → error toast.
 *   2. `submit(payload, fullname)` — POST /auth/signup/. 201 → router.push to
 *      /signup/{name}, anything else → error toast.
 *
 * Returns dialog state + submitting flag for the page to wire into the form
 * markup. Term-scroll gating stays on the page (it's pure UI gating).
 */
export function useSignupSubmission() {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [existsOpen, setExistsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Guards against double-clicks on the confirm Dialog primary — `submitting`
  // is set inside an async handler, leaving a small window where the button
  // is still clickable before the disabled state flushes.
  const submittingRef = useRef(false);

  // Step 1: precheck via /auth/userExists/. The endpoint returns 200 for
  // existing users and 404 for new. Only 404 proceeds — every other failure
  // mode (network, 5xx, missing response) surfaces as an error toast so we
  // don't silently fall through to a POST behind a failed precheck.
  const precheck = async (email: string) => {
    setSubmitting(true);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/auth/userExists/${encodeURIComponent(email)}`,
      );
      if (res.status === 200) {
        setExistsOpen(true);
        return;
      }
      // Non-200, non-throw (rare): treat as ambiguous — surface error.
      toast.error(PRECHECK_ERROR);
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr?.response?.status === 404) {
        setConfirmOpen(true);
        return;
      }
      toast.error(PRECHECK_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  const submit = async (payload: SignupPayload) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup/`, payload);
      if (res.status === 201) {
        setConfirmOpen(false);
        router.push(`/signup/${encodeURIComponent(payload.fullname)}`);
        return;
      }
      toast.error(SUBMIT_ERROR);
    } catch {
      toast.error(SUBMIT_NETWORK_ERROR);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return {
    submitting,
    confirmOpen,
    setConfirmOpen,
    existsOpen,
    setExistsOpen,
    precheck,
    submit,
  };
}
