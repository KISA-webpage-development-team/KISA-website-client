// 1. List Button [Always]
// 2. Edit Button [Only when the user is the author]
// 3. Delete Button [Only when the user is the author]

import React from "react";
import ListIcon from "../../ui/ListIcon";
import ImageButton from "../../shared/ImageButton";
import { useRouter } from "next/navigation";
import PencilIcon from "../../ui/PencilIcon";
import TrashcanIcon from "../../ui/TrashcanIcon";
import { BoardType } from "@/types/board";
import CustomImageButton from "@/final_refactor_src/components/button/CustomImageButton";
import GoBlueButton from "./GoBlueButton";

type PostButtonBarProps = {
  email: string;
  isAuthor: boolean;
  type: BoardType;
  postid: number;
  title: string;
};

export default function PostButtonBar({
  email,
  isAuthor,
  type,
  postid,
  title,
}: PostButtonBarProps) {
  const route = useRouter();

  const OnClickBackToList = () => {
    // [TODO]: fix back to list logic
    // need to change this to just "go back"
    // This is very interesting, when user navigates to post from non-list page, just "going back" is not enough
    // for now, it is just going back to the board page without remembering pageNum and pageSize
    route.push(`/boards/${type}`);
  };

  const onClickPostUpdate = () => {
    route.push(`/posts/update/${postid}?board_type=${type}`);
  };

  const onClickPostDelete = () => {
    const formattedTitle = title.replace("/", "-");
    // window.location.href = `/posts/delete/${type}/${formattedTitle}/${postid}`;
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

      <div className="relative">
        {/* <CustomImageButton
          type="primary"
          icon={<ListIcon />}
          text="GO BLUE!"
          onClick={() => {}}
          className="absolute left-0 top-0 w-32"
        /> */}
        <GoBlueButton
          didLike={false}
          email={email}
          target="post"
          className="absolute left-0 top-0 w-32"
        />
      </div>

      {/* Edit + Delete Button */}
      {isAuthor && (
        <div className="flex items-center gap-2">
          <CustomImageButton
            type="secondary"
            icon={<PencilIcon color="gray" />}
            text="수정"
            onClick={onClickPostUpdate}
          />
          <CustomImageButton
            type="secondary"
            icon={<TrashcanIcon color="gray" />}
            text="삭제"
            onClick={onClickPostDelete}
          />
        </div>
      )}
    </div>
  );
}
