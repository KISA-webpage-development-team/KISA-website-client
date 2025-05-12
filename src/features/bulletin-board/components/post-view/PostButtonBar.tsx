// 1. List Button [Always]
// 2. Edit Button [Only when the user is the author]
// 3. Delete Button [Only when the user is the author]

import React from "react";
import { useRouter } from "next/navigation";

// sub-ui components
import {
  PencilIcon,
  TrashcanIcon,
  ListIcon,
} from "@/final_refactor_src/components/icon";
import CustomImageButton from "@/final_refactor_src/components/button/CustomImageButton";
import GoBlueButton from "@/features/bulletin-board/components/shared/GoBlueButton";

// utils
import { isEveryKisaBoard } from "@/utils/formats/boardType";

// types
import { UserSession } from "@/lib/next-auth/types";
import { BoardType } from "@/types/board";

type PostButtonBarProps = {
  email: string; // post email
  session?: UserSession | null;
  type: BoardType;
  postid: number;
};

export default function PostButtonBar({
  email,
  session = null,
  type,
  postid,
}: PostButtonBarProps) {
  const route = useRouter();

  const isEveryKisa = isEveryKisaBoard(type);
  const isAuthor = session?.user?.email === email;

  const OnClickBackToList = () => {
    // [TODO]: fix back to list logic
    // need to change this to just "go back"
    // This is very interesting, when user navigates to post from non-list page, just "going back" is not enough
    // for now, it is just going back to the board page without remembering pageNum and pageSize
    // maybe this is because of misuse of SWR caching

    if (isEveryKisaBoard(type)) {
      window.location.href = `/everykisa/${type}`;
    } else {
      window.location.href = `/boards/${type}`;
    }
  };

  const onClickPostUpdate = () => {
    route.push(`/posts/update/${postid}?board_type=${type}`);
  };

  const onClickPostDelete = () => {
    route.push(`/posts/delete/${type}/posts/${postid}`);
  };

  return (
    <div
      className="
    w-full flex justify-between py-2 sm:py-4"
    >
      {/* List Button */}
      <CustomImageButton
        type="secondary"
        icon={<ListIcon />}
        text="목록"
        onClick={OnClickBackToList}
      />
      <div className="flex items-center gap-2">
        {/* Go Blue Button */}
        {isEveryKisa && (
          <GoBlueButton targetType="post" id={postid} session={session} />
        )}

        {/* Edit + Delete Button */}
        {isAuthor && (
          <div className="flex items-center gap-2">
            <CustomImageButton
              type="secondary"
              icon={<PencilIcon color="gray" />}
              text="수정"
              onClick={onClickPostUpdate}
              aria-label="Edit post"
            />
            <CustomImageButton
              type="secondary"
              icon={<TrashcanIcon color="gray" />}
              text="삭제"
              onClick={onClickPostDelete}
              aria-label="Delete post"
            />
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}
