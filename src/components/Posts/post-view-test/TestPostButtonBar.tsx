// 1. List Button [Always]
// 2. Edit Button [Only when the user is the author]
// 3. Delete Button [Only when the user is the author]

import React from "react";
import { PostButtonBarProps } from "../../../model/props/posts";
import ListIcon from "../../ui/ListIcon";
import ImageButton from "../../shared/ImageButton";
import { useRouter } from "next/navigation";
import PencilIcon from "../../ui/PencilIcon";
import TrashcanIcon from "../../ui/TrashcanIcon";

export default function TestPostButtonBar({
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
    route.push(`/posts/update/${postid}`);
  };

  const onClickPostDelete = () => {
    const formattedTitle = title.replace("/", "-");

    route.push(`/posts/delete/${type}/${formattedTitle}/${postid}`);
  };

  return (
    <div className="w-full flex items-center justify-between py-2 sm:py-3">
      {/* List Button */}
      <ImageButton
        icon={<ListIcon />}
        text="목록"
        onClick={OnClickBackToList}
      />
      {/* Edit + Delete Button */}
      {isAuthor && (
        <div className="flex items-center gap-2">
          <ImageButton
            icon={<PencilIcon color="gray" />}
            text="수정"
            onClick={onClickPostUpdate}
          />
          <ImageButton
            icon={<TrashcanIcon color="gray" />}
            text="삭제"
            onClick={onClickPostDelete}
          />
        </div>
      )}
    </div>
  );
}
