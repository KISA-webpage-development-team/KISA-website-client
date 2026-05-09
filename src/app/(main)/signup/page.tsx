"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useForm, Form } from "@umichkisa-ds/form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Divider,
  toast,
} from "@umichkisa-ds/web";
import { signIn } from "next-auth/react";

import { BACKEND_URL } from "@/constants/env";
import {
  personalInfoTerm,
  websiteTerm,
} from "@/features/users/data/termCondition";

type SignUpFormValues = {
  name: string;
  email: string;
  major: string;
  bornDate: Date | undefined;
  gradYear: string;
  linkedin: string;
  personTerm: boolean;
  websiteTerm: boolean;
};

type TermKey = "person" | "website";

type TermSpec = {
  key: TermKey;
  fieldName: "personTerm" | "websiteTerm";
  label: string;
  checkboxLabel: string;
  text: React.ReactNode;
};

const TERMS: TermSpec[] = [
  {
    key: "person",
    fieldName: "personTerm",
    label: personalInfoTerm.label,
    checkboxLabel: personalInfoTerm.checkboxLabel,
    text: personalInfoTerm.text,
  },
  {
    key: "website",
    fieldName: "websiteTerm",
    label: websiteTerm.label,
    checkboxLabel: websiteTerm.checkboxLabel,
    text: websiteTerm.text,
  },
];

// Lenient http(s) check for the optional LinkedIn URL — empty stays valid.
const URL_PATTERN = /^https?:\/\/[^\s]+$/i;
const UMICH_EMAIL_PATTERN = /^[^\s@]+@umich\.edu$/i;

export default function SignUpPage() {
  const router = useRouter();

  const methods = useForm<SignUpFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      major: "",
      bornDate: undefined,
      gradYear: "",
      linkedin: "",
      personTerm: false,
      websiteTerm: false,
    },
  });

  // Per-term scroll gate — disables the Dialog's "동의합니다" button until
  // the body has been scrolled to the bottom at least once. Independent of
  // RHF state because it's pure UI gating.
  const [termScrolled, setTermScrolled] = useState<Record<TermKey, boolean>>({
    person: false,
    website: false,
  });
  const [openTerm, setOpenTerm] = useState<TermKey | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [existsOpen, setExistsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Guards against double-clicks on the confirm Dialog primary — `submitting`
  // is set inside an async handler, leaving a small window where the button
  // is still clickable before the disabled state flushes.
  const submittingRef = useRef(false);

  const handleScroll = (key: TermKey) =>
    (event: React.UIEvent<HTMLDivElement>) => {
      const el = event.currentTarget;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      if (atBottom && !termScrolled[key]) {
        setTermScrolled((prev) => ({ ...prev, [key]: true }));
      }
    };

  // Callback ref for the term Dialog's scroll container. When the body has
  // no overflow (term text shorter than the container), the scroll handler
  // never fires and the agree button would stay disabled forever — so we
  // pre-enable it on mount.
  const termBodyRef = (key: TermKey) => (el: HTMLDivElement | null) => {
    if (!el || termScrolled[key]) return;
    if (el.scrollHeight <= el.clientHeight) {
      setTermScrolled((prev) => ({ ...prev, [key]: true }));
    }
  };

  const agreeToTerm = (term: TermSpec) => {
    methods.setValue(term.fieldName, true, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setOpenTerm(null);
  };

  // Step 1: precheck via /auth/userExists/. The endpoint returns 200 for
  // existing users and 404 for new. Only 404 proceeds — every other failure
  // mode (network, 5xx, missing response) surfaces as an error toast so we
  // don't silently fall through to a POST behind a failed precheck.
  const onSubmit = async (values: SignUpFormValues) => {
    setSubmitting(true);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/auth/userExists/${encodeURIComponent(values.email)}`
      );
      if (res.status === 200) {
        setSubmitting(false);
        setExistsOpen(true);
        return;
      }
      // Non-200, non-throw (rare): treat as ambiguous — surface error.
      setSubmitting(false);
      toast.error(
        "회원가입 확인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr?.response?.status === 404) {
        // New user — open confirmation Dialog.
        setSubmitting(false);
        setConfirmOpen(true);
        return;
      }
      setSubmitting(false);
      toast.error(
        "회원가입 확인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  };

  const handleConfirmedSubmit = async () => {
    if (submittingRef.current) return;
    const values = methods.getValues();
    const bornDate = values.bornDate;
    if (!bornDate) {
      // Validation should have caught this; defensive guard for type narrowing.
      setConfirmOpen(false);
      return;
    }

    const payload = {
      fullname: values.name,
      email: values.email,
      bornYear: bornDate.getFullYear(),
      bornMonth: bornDate.getMonth() + 1,
      bornDate: bornDate.getDate(),
      major: values.major || null,
      gradYear: values.gradYear ? Number(values.gradYear) : null,
      linkedin: values.linkedin ? values.linkedin : null,
    };

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup/`, payload);
      if (res.status === 201) {
        setConfirmOpen(false);
        router.push(`/signup/${encodeURIComponent(values.name)}`);
        return;
      }
      toast.error("회원가입에 실패했습니다.");
    } catch {
      toast.error(
        "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const handleAlreadyExistsSignIn = () => {
    setExistsOpen(false);
    signIn();
  };

  return (
    <section className="flex w-full flex-col gap-6">
     <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      {/* Compact text hero */}
      <header className="flex flex-col gap-2 text-center">
        <h1 className="type-h1 text-foreground">Welcome to KISA</h1>
        <p className="type-body text-muted-foreground">
          Please complete the form below to create your account.
        </p>
      </header>

      <Form
        form={methods}
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-6"
      >
        {/* Identity */}
        <fieldset className="flex flex-col gap-4">
          <legend className="type-label text-muted-foreground">
            Identity
          </legend>
          <Form.Input
            name="name"
            label="Name"
            placeholder="ex) Jioh In"
            rules={{
              required: "Please enter your name.",
              minLength: { value: 1, message: "Please enter your name." },
            }}
            description="This name will appear on the bulletin board. Please use your real name."
          />
          <Form.Input
            name="email"
            label="UMich Email"
            type="email"
            placeholder="ex) example@umich.edu"
            rules={{
              required: "Please enter your UMich email.",
              pattern: {
                value: UMICH_EMAIL_PATTERN,
                message: "Email must end with @umich.edu.",
              },
            }}
          />
        </fieldset>

        <Divider />

        {/* Academic */}
        <fieldset className="flex flex-col gap-4">
          <legend className="type-label text-muted-foreground">
            Academic
          </legend>
          <Form.Input
            name="major"
            label="Major"
            placeholder="ex) Computer Science"
            rules={{ required: "Please enter your major." }}
          />
          <Form.DatePicker
            name="bornDate"
            label="Birthdate"
            placeholder="Select your birthdate"
            rules={{ required: "Please select your birthdate." }}
          />
          <Form.Input
            name="gradYear"
            label="Graduation Year"
            type="number"
            placeholder="ex) 2026"
            rules={{
              required: "Please enter your graduation year.",
              pattern: {
                value: /^\d{4}$/,
                message: "Please enter a 4-digit year.",
              },
            }}
          />
        </fieldset>

        <Divider />

        {/* Optional */}
        <fieldset className="flex flex-col gap-4">
          <legend className="type-label text-muted-foreground">
            Optional
          </legend>
          <Form.Input
            name="linkedin"
            label="LinkedIn URL"
            type="url"
            placeholder="https://www.linkedin.com/in/..."
            rules={{
              validate: (value: string) =>
                !value || URL_PATTERN.test(value)
                  ? true
                  : "Please enter a valid URL (starting with http:// or https://).",
            }}
          />
        </fieldset>

        <Divider />

        {/* Terms */}
        <fieldset className="flex flex-col gap-4">
          <legend className="type-label text-muted-foreground">Terms</legend>
          {TERMS.map((term) => (
            <TermRow
              key={term.key}
              term={term}
              onOpen={() => setOpenTerm(term.key)}
            />
          ))}
        </fieldset>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Signing up..." : "Sign Up"}
        </Button>
      </Form>
     </div>

      {/* Per-term Dialog with scroll-to-bottom gate on the agree button */}
      {TERMS.map((term) => (
        <Dialog
          key={term.key}
          open={openTerm === term.key}
          onOpenChange={(open) => {
            if (!open) setOpenTerm(null);
          }}
        >
          <DialogContent size="lg">
            <DialogTitle>{term.label}</DialogTitle>
            <div
              ref={termBodyRef(term.key)}
              className="max-h-[60vh] overflow-y-auto rounded-md border border-border bg-surface-subtle p-4"
              onScroll={handleScroll(term.key)}
            >
              {term.text}
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setOpenTerm(null)}
              >
                닫기
              </Button>
              <Button
                variant="primary"
                disabled={!termScrolled[term.key]}
                onClick={() => agreeToTerm(term)}
              >
                동의합니다
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}

      {/* Pre-POST confirmation */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent size="md">
          <DialogTitle>회원가입을 진행하시겠습니까?</DialogTitle>
          <DialogDescription>
            한 번 생성된 로그인 정보는 수정이 어렵습니다. 입력하신 정보를
            확인하신 뒤 진행해주세요.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setConfirmOpen(false)}
              disabled={submitting}
            >
              취소
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmedSubmit}
              disabled={submitting}
            >
              {submitting ? "Signing up..." : "확인"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Already-exists redirect */}
      <Dialog open={existsOpen} onOpenChange={setExistsOpen}>
        <DialogContent size="md">
          <DialogTitle>이미 가입된 이메일입니다.</DialogTitle>
          <DialogDescription>
            입력하신 이메일로 이미 KISA 계정이 존재합니다. 로그인하여
            계속해주세요.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setExistsOpen(false)}
            >
              취소
            </Button>
            <Button variant="primary" onClick={handleAlreadyExistsSignIn}>
              로그인하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/**
 * A single term row on the form: a Form.Checkbox bound to RHF (so it gates
 * submit via the `required` rule), plus a "약관 보기" trigger that opens the
 * full text Dialog. The checkbox itself is disabled until the user has either
 * scrolled the Dialog to the bottom OR clicked the "동의합니다" button — but
 * we render it always-visible so the agreed state is legible at a glance.
 */
function TermRow({
  term,
  onOpen,
}: {
  term: TermSpec;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="type-body text-foreground">{term.label}</p>
        <Button
          variant="tertiary"
          size="sm"
          type="button"
          onClick={onOpen}
          className="shrink-0"
        >
          약관 보기
        </Button>
      </div>
      <Form.Checkbox
        name={term.fieldName}
        label={term.checkboxLabel}
        rules={{
          validate: (value: boolean) =>
            value || "약관에 동의해주세요.",
        }}
      />
    </div>
  );
}
