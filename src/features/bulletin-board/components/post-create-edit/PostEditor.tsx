"use client";

/**
 * PostEditor — shared create/update editor for bulletin-board posts.
 *
 * Layout (top-down, single column):
 *   1. Title (Form.Input, required, length > 0)
 *   2. Body (ReactQuill via TextEditor — wired into RHF via useFormField)
 *   3. Action row:
 *        left:  AnnouncementCheckbox (admin && !announcement-board)
 *               + Anonymous radio (create && everykisa)
 *        right: Submit (Form.Button, primary, disableWhenInvalid)
 *
 * State / submit ownership lives in usePostEditorForm + usePostSubmit.
 * TextEditor is preserved verbatim — only its text/setText props are bridged
 * into the RHF "text" field via useFormField.
 */

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Form, useFormField, useFormStatus } from "@umichkisa-ds/form";
import {
  Checkbox,
  LoadingSpinner,
  RadioGroup,
  RadioItem,
  StatusView,
} from "@umichkisa-ds/web";

import useAdmin from "@/lib/next-auth/useAdmin";
import { isAnnouncementBoard } from "@/utils/formats/boardType";
import {
  PostEditorFormValues,
  usePostEditorForm,
} from "@/features/bulletin-board/hooks/usePostEditorForm";
import { usePostSubmit } from "@/features/bulletin-board/hooks/usePostSubmit";
import { usePost } from "@/apis/posts/swrHooks";

// TextEditor uses ReactQuill — must be client-only.
const TextEditor = dynamic(
  () => import("@/features/bulletin-board/components/shared/TextEditor"),
  { ssr: false },
);

type PostEditorProps = {
  userName: string;
  userEmail: string;
  token: string | undefined;
  boardType: string;
  curPostId?: number | string | null;
  mode: "create" | "update";
};

const titleRules = {
  required: "제목을 입력해주세요.",
  validate: (v: string) =>
    (typeof v === "string" && v.length > 0) || "제목을 입력해주세요.",
};

const textRules = {
  validate: (v: string) =>
    (typeof v === "string" && v !== "" && v !== "<p><br></p>") ||
    "내용을 입력해주세요.",
};

export default function PostEditor({
  userName,
  userEmail,
  token,
  boardType,
  curPostId = null,
  mode,
}: PostEditorProps) {
  const router = useRouter();
  const { isAdmin, status: adminStatus } = useAdmin();
  const numericPostId = curPostId ? Number(curPostId) : null;
  const { form, isEveryKisa, buildPayload } = usePostEditorForm({
    userName,
    userEmail,
    boardType,
    curPostId: numericPostId,
    mode,
  });
  const { submit } = usePostSubmit({
    mode,
    postid: numericPostId,
    token,
    onSuccess: ({ href }) => router.push(href),
  });

  // SWR dedupes against usePostEditorForm's identical request; no extra fetch.
  const { post: gatedPost, isLoading: isGateLoading } = usePost(
    mode === "update" && numericPostId ? numericPostId : 0,
  );

  if (adminStatus === "loading") {
    return (
      <div className="flex w-full justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }
  if (isAnnouncementBoard(boardType) && isAdmin === false) {
    return <StatusView variant="not-authorized" />;
  }
  // Author-only edit gate: admins can delete others' posts but not edit them
  // (otherwise the author byline becomes ambiguous after an admin edit).
  if (mode === "update") {
    if (isGateLoading || !gatedPost) {
      return (
        <div className="flex w-full justify-center py-12">
          <LoadingSpinner />
        </div>
      );
    }
    if (gatedPost.email !== userEmail) {
      return <StatusView variant="not-authorized" />;
    }
  }

  const onSubmit = async (values: PostEditorFormValues) => {
    await submit(buildPayload(values));
  };

  const isBoardAnnouncement = isAnnouncementBoard(boardType);

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
      <Form.Input
        name="title"
        label="제목"
        type="text"
        rules={titleRules}
        placeholder="제목을 입력해주세요"
      />

      <TextEditorField token={token} />

      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          {isAdmin && !isBoardAnnouncement && <AnnouncementField />}
          {mode === "create" && isEveryKisa && <AnonymousField />}
        </div>

        <SubmitButton mode={mode} />
      </div>
    </Form>
  );
}

// --- bridges ---------------------------------------------------------------

function TextEditorField({ token }: { token: string | undefined }) {
  const { value, inputProps } = useFormField<PostEditorFormValues, "text">(
    "text",
    textRules,
  );

  return (
    <TextEditor
      token={token}
      text={(value as string) ?? ""}
      setText={inputProps.onChange as (s: string) => void}
    />
  );
}

function AnnouncementField() {
  const { value, inputProps } = useFormField<PostEditorFormValues, "isAnnouncement">(
    "isAnnouncement",
  );
  return (
    <div className="flex items-center gap-3">
      <span className="type-body-sm text-foreground">공지사항</span>
      <Checkbox
        name={inputProps.name}
        checked={!!value}
        onChange={(e) => inputProps.onChange(e.target.checked)}
        onBlur={inputProps.onBlur}
      />
    </div>
  );
}

function AnonymousField() {
  const { value, inputProps } = useFormField<PostEditorFormValues, "anonymous">(
    "anonymous",
  );
  return (
    <div className="flex items-center gap-3">
      <span className="type-body-sm text-foreground">익명 여부</span>
      <RadioGroup
        value={(value as string) ?? "non-anonymous"}
        onValueChange={(v) => inputProps.onChange(v)}
        orientation="horizontal"
        className="flex flex-row gap-4"
      >
        <RadioItem value="non-anonymous" text="실명" />
        <RadioItem value="anonymous" text="익명" />
      </RadioGroup>
    </div>
  );
}

// Isolated to localize re-renders to the button only.
function SubmitButton({ mode }: { mode: "create" | "update" }) {
  const { isSubmitting } = useFormStatus();
  const label = mode === "create" ? "등록" : "수정";
  return (
    <Form.Button type="submit" variant="primary" disableWhenInvalid>
      {isSubmitting ? "처리 중..." : label}
    </Form.Button>
  );
}
