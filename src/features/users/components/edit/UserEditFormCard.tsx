"use client";

/**
 * UserEditFormCard — self-only profile editor.
 *
 * Layout (single visual surface, top-down):
 *   1. Read-only header: avatar + fullname + email (auth-provided, immutable).
 *   2. Editable fields, single column max-w-2xl, centered:
 *        전공 (required), 졸업년도 (Select), LinkedIn (optional).
 *   3. Submit (Form.Button) — disabled until valid; loading state during PATCH.
 *
 * Success: success toast → SWR mutate → router.push view page.
 * Failure: error toast, button re-enabled, form values preserved.
 */

import { useRouter } from "next/navigation";
import { Form, useForm, useFormStatus } from "@umichkisa-ds/form";
import {
  Avatar,
  Icon,
  LoadingSpinner,
  SelectContent,
  SelectItem,
  SelectTrigger,
  StatusView,
  toast,
} from "@umichkisa-ds/web";
import { useSWRConfig } from "swr";

import { updateUser } from "@/apis/users/mutations";
import { useUser } from "@/apis/users/swrHooks";

type UserEditFormCardProps = {
  email: string;
  token: string;
  sessionImage: string;
};

interface UserEditFormValues {
  major: string;
  gradYear: string; // Form.Select stores string values; we convert at submit
  linkedin: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const GRAD_YEARS: number[] = Array.from(
  { length: 6 + 8 + 1 }, // currentYear-6 .. currentYear+8
  (_, i) => CURRENT_YEAR - 6 + i
);

const majorRules = {
  required: "전공을 입력해주세요.",
};

const gradYearRules = {
  required: "졸업년도를 선택해주세요.",
};

export default function UserEditFormCard({
  email,
  token,
  sessionImage,
}: UserEditFormCardProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { user, isLoading, error } = useUser(email, token);

  // We mount the Form unconditionally once user data is available so that
  // defaultValues are stable for react-hook-form (it doesn't reset when
  // defaultValues change after mount).
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner label="불러오는 중..." />
      </div>
    );
  }

  if (error || !user) {
    return (
      <StatusView
        variant="error"
        title="사용자 정보를 불러올 수 없습니다"
        description="잠시 후 다시 시도해주세요."
      />
    );
  }

  return (
    <UserEditFormBody
      email={email}
      token={token}
      sessionImage={sessionImage}
      defaults={{
        major: user.major ?? "",
        gradYear: user.gradYear ? String(user.gradYear) : "",
        linkedin: user.linkedin ?? "",
      }}
      fullname={user.fullname}
      onSuccess={async () => {
        // Invalidate /users/:email/ cache so the view page reflects new values.
        await mutate(
          (key) =>
            Array.isArray(key) &&
            typeof key[0] === "string" &&
            key[0] === `/users/${email}/`,
          undefined,
          { revalidate: true }
        );
        router.push(`/users/${encodeURIComponent(email)}`);
      }}
    />
  );
}

function UserEditFormBody({
  email,
  token,
  sessionImage,
  defaults,
  fullname,
  onSuccess,
}: {
  email: string;
  token: string;
  sessionImage: string;
  defaults: UserEditFormValues;
  fullname: string;
  onSuccess: () => Promise<void> | void;
}) {
  const methods = useForm<UserEditFormValues>({
    mode: "onTouched",
    defaultValues: defaults,
  });

  const onSubmit = async (values: UserEditFormValues) => {
    try {
      const res = await updateUser(
        email,
        {
          major: values.major,
          gradYear: parseInt(values.gradYear, 10),
          linkedin: values.linkedin,
        },
        token
      );

      if (!res) {
        throw new Error("Update failed");
      }

      toast.success("정보가 수정되었습니다.");
      await onSuccess();
    } catch (_err) {
      toast.error("정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      {/* Read-only header */}
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
        <Avatar size="lg" src={sessionImage} name={fullname} />
        <div className="flex flex-col items-center gap-1 md:items-start">
          <h1 className="type-h1 tracking-tight text-foreground">{fullname}</h1>
          <span className="flex items-center gap-2 type-body text-muted-foreground">
            <Icon name="mail" size="sm" />
            {email}
          </span>
        </div>
      </div>

      {/* Editable fields */}
      <Form
        form={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
      >
        <Form.Input
          name="major"
          label="전공 (Major)"
          type="text"
          rules={majorRules}
          placeholder="예: Computer Science"
        />

        <Form.Select
          name="gradYear"
          label="졸업년도 (Graduation Year)"
          rules={gradYearRules}
        >
          <SelectTrigger placeholder="졸업년도 선택" />
          <SelectContent>
            {GRAD_YEARS.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Form.Select>

        <Form.Input
          name="linkedin"
          label="LinkedIn"
          type="text"
          description="LinkedIn 프로필 URL (선택)"
          placeholder="https://www.linkedin.com/in/..."
        />

        <SubmitButton />
      </Form>
    </div>
  );
}

// Isolated to localize re-renders to the button only — useFormStatus
// subscribes via context, so keystrokes that flip isValid don't re-render
// the inputs above.
function SubmitButton() {
  const { isSubmitting } = useFormStatus();
  return (
    <Form.Button type="submit" variant="primary" disableWhenInvalid>
      {isSubmitting ? "저장 중..." : "수정"}
    </Form.Button>
  );
}
