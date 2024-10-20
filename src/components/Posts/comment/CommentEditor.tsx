import React, { ChangeEvent, useState } from "react";
import { createComment, updateComment } from "@/apis/comments/mutations";
import { NewCommentBody } from "@/types/comment";
import { CustomButton } from "@/final_refactor_src/components/button";
import { Radio, RadioGroup } from "@nextui-org/react";
import { cn } from "@/utils/styles/cn";

type CommentEditorProps = {
  isEveryKisa?: boolean;
  mode: "create" | "update" | "reply";
  session: any;
  postid: number;
  commentid?: number;
  curCommentId?: number | null;
  placeholder?: string;
  setCommentsStale: (value: boolean) => void;
  setOpenCommentEditor?: (value: boolean) => void;
};

export default function CommentEditor({
  isEveryKisa = false,
  mode,
  session,
  postid,
  commentid = 0,
  curCommentId = null,
  placeholder = "댓글을 입력해주세요",
  setCommentsStale,
  setOpenCommentEditor = () => {},
}: CommentEditorProps) {
  // comment content
  const [text, setText] = useState<string>(
    placeholder === "댓글을 입력해주세요" ? "" : placeholder
  );

  // anonymous checkbox state
  const [anonymousValue, setAnonymousValue] = useState<string>("none");

  // state to prevent multiple comment submissions at the same time
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  /**
   * @desc Submit new comment (POST)
   */
  const handleSubmitComment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 일반 댓글 + 답글
    const data: NewCommentBody = {
      email: session?.user.email,
      fullname: session?.user.name,
      text: text,
      isCommentOfComment: commentid === 0 ? false : true,
      parentCommentid: commentid,
      anonymous: isEveryKisa ? anonymousValue === "anonymous" : false,
      secret: true
    };
    // send post api call to create comment with postid
    const res = await createComment(postid, data, session?.token);

    if (res) {
      // modify states after new comment has been submitted
      setCommentsStale(true);
      setOpenCommentEditor(false);
      setText("");

      setIsSubmitting(false);
    } else {
      window.alert("댓글 등록에 실패했습니다.");
      // error handling
      // console.log("comment creation failed");
    }
  };

  /**
   * @desc Submit updated comment (PUT)
   */
  const handleSubmitUpdate = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // send update api call
    const data = {
      text: text,
    };

    const res = await updateComment(curCommentId, data, session?.token);
    if (res) {
      setCommentsStale(true);
      setOpenCommentEditor(false);
      setIsSubmitting(false);
    } else {
      // error handling
      console.log("comment update failed");
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row 
    items-end sm:items-center w-full"
    >
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-20 sm:h-32
             border border-gray-300 rounded-md p-3
              text-sm md:text-base
              focus:outline-michigan-blue"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target === document.activeElement) {
            e.preventDefault();
            if (mode === "update") {
              handleSubmitUpdate();
            } else {
              handleSubmitComment();
            }
          }
        }}
      />
      {/* <button
        disabled={text.length === 0}
        onClick={mode === "update" ? handleSubmitUpdate : handleSubmitComment}
        className="block h-full sm:h-20 md:h-28 md:aspect-square rounded-md 
        mt-1 sm:mt-0
        text-xs sm:text-sm md:text-base 
        !px-3 !py-1 sm:!px-4 sm:!py-2
        blue_button"
      >
        {isSubmitting ? "등록 중..." : "댓글 등록"}
      </button> */}
      <div
        className="w-full sm:w-1/6 sm:h-full
        pt-2
        flex sm:flex-col sm:justify-between
      flex-row"
      >
        {/* If isEveryKisa, show anonymous checkbox options */}
        {isEveryKisa && (
          <>
            <RadioGroup
              className="hidden
              sm:flex gap-1 pl-3"
              defaultValue="none"
              value={anonymousValue}
              onValueChange={setAnonymousValue}
            >
              <Radio value="anonymous">익명</Radio>
              <Radio value="non-anonymous">실명</Radio>
              <Radio
                value="none"
                classNames={{
                  base: cn("hidden"),
                }}
              >
                선택 안함
              </Radio>
            </RadioGroup>
            <RadioGroup
              className="flex sm:hidden w-1/4"
              size="sm"
              defaultValue="none"
              value={anonymousValue}
              onValueChange={setAnonymousValue}
            >
              <Radio value="anonymous">익명</Radio>
              <Radio value="non-anonymous">실명</Radio>
              <Radio
                value="none"
                classNames={{
                  base: cn("hidden"),
                }}
              >
                선택 안함
              </Radio>
            </RadioGroup>
          </>
        )}
        
        <input type="checkbox" id="secret" name="secret"/>
        <label htmlFor="secret">비밀댓글</label>
          
        {/* If isEveryKisa, anonymousValue should be selected */}
        <CustomButton
          disabled={
            text.length === 0 ||
            (isEveryKisa && anonymousValue === "none") ||
            isSubmitting
          }
          onClick={mode === "update" ? handleSubmitUpdate : handleSubmitComment}
          text={isSubmitting ? "등록 중..." : "댓글 등록"}
          className="w-full h-full sm:h-fit"
        />
      </div>
    </div>
  );
}
// git switch onboarding
// git pull origin onboarding // update된 코드를 가져온다

// git switch devteam
// git merge onboarding