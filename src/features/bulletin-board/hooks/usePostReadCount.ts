// usePostReadCount
// : handle post read count based on browser cookie

import { useState, useEffect } from "react";

import { incrementReadCount } from "@/apis/posts/mutations";
import { setCookie, getCookie } from "@/lib/react-cookie/cookie";

const ONE_DAY_SECONDS = 60 * 60 * 24;

/**
 * @desc Handle post read count based on browser cookie
 * @param postid - post id
 * @returns didRead - whether the user has read the post
 *
 * @note when cookie doesn't exist, create one and increase read count (`incrementReadCount`)
 * if cookie exists, don't increase read count, but update the cookie expiration time
 */
export default function usePostReadCount(postid: number) {
  const [didRead, setDidRead] = useState<boolean>(
    () => getCookie(`read-${postid}`) !== undefined
  );

  useEffect(() => {
    let isMounted = true;
    const cookieName = `read-${postid}`;
    const alreadyRead = getCookie(cookieName) !== undefined;

    const postReadCount = async () => {
      try {
        const res = await incrementReadCount(postid);
        if (res === null && isMounted) {
          console.log("Failed to increment read count");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error incrementing read count: ", error);
        }
      }
    };

    setCookie(cookieName, true, {
      path: "/",
      secure: true,
      maxAge: ONE_DAY_SECONDS,
    });

    if (!alreadyRead) {
      setDidRead(true);
      postReadCount();
    } else {
      setDidRead(true); // User has read this post before
    }

    return () => {
      isMounted = false;
    };
  }, [postid]);

  return didRead;
}
