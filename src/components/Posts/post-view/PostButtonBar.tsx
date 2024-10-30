// 1. List Button [Always]
// 2. Edit Button [Only when the user is the author]
// 3. Delete Button [Only when the user is the author]

import React, { useEffect, useState } from "react";
import ListIcon from "../../ui/ListIcon";
import ImageButton from "../../shared/ImageButton";
import { useRouter } from "next/navigation";
import PencilIcon from "../../ui/PencilIcon";
import TrashcanIcon from "../../ui/TrashcanIcon";
import { BoardType } from "@/types/board";
import CustomImageButton from "@/final_refactor_src/components/button/CustomImageButton";
import GoBlueButton from "./GoBlueButton";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { LikeBody } from "@/types/like";
import { getLikeByUser } from "@/apis/likes/queries";
import { UserSession } from "@/lib/next-auth/types";

type PostButtonBarProps = {
  email: string; // post email
  session?: UserSession | null;
  type: BoardType;
  postid: number;
  title: string;
};

export default function PostButtonBar({
  email,
  session = null,
  type,
  postid,
  title,
}: PostButtonBarProps) {
  // TODO: add "didLike" to GoBlueButton
  const route = useRouter();
  const isEveryKisa = isEveryKisaBoard(type);

  const isAuthor = session?.user?.email === email;
  const token = session?.token;

  // session user가 현재 postid의 post를 좋아했는가?
  const [didLike, setDidLike] = useState<boolean>(false);

  // fetch like status
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const body = {
          email: session?.user.email,
          target: "post",
        };

        const res = await getLikeByUser(
          postid,
          body as LikeBody,
          session?.token
        );
        if (!res) {
          console.log("Failed to fetch like status");
        } else {
          setDidLike(res.liked);
        }
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };

    if (session) {
      fetchLikeStatus();
    }
  }, [postid, session]);

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

      {/* Go Blue Button */}
      {/* NOTE: has separate logic, we made custom button component */}
      {!isAuthor && isEveryKisa && (
        <GoBlueButton
          postid={postid}
          didLike={didLike}
          email={email}
          token={token}
        />
      )}
      {/* </div> */}

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
