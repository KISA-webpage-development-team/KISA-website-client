// BoardClient.jsx
// : rendering the board
// + pagination bar
// + fetch board data

import { useState, useEffect } from "react";
import { getBoardPostNum, getBoardPosts } from "../../service/board";
import { getBoardAnnouncements } from "../../service/board";
import { heebo } from "../../utils/fonts/textFonts";

// sub-ui components
import PageSizeSelector from "./PageSizeSelector";
import Pagination from "./Pagination";
import BoardTable from "./BoardTable";
import MobileBoardTable from "./MobileBoardTable";

import { Pagination as PaginationBar } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BoardClient({ boardType, page, size }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]); // 일반 게시물
  const [announcementPosts, setAnnouncementPosts] = useState([]); // 공지사항
  const [pageNum, setPageNum] = useState(page || 1);
  const [pageSize, setPageSize] = useState(size || 10); // 10, 20, 30

  const { data: session } = useSession();
  const [totalPostNum, setTotalPostNum] = useState(null); // 게시판 내의 게시물 총 개수

  // fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getBoardAnnouncements(boardType, session?.token);
      setAnnouncementPosts(data?.results);
    };

    if (boardType !== "announcement") {
      fetchAnnouncements();
    }
  }, [boardType]);

  // fetch non-announcements
  useEffect(() => {
    const fetchPosts = async () => {
      // pageNum - 1 is neccessary because page is 0-indexing in backend
      const data = await getBoardPosts(boardType, pageSize, pageNum - 1);
      setPosts(data?.results);
    };

    // if (pageNum && pageSize) {
    fetchPosts();
    // }
  }, [pageNum, pageSize, boardType]);

  // fetch number of posts in the board
  useEffect(() => {
    const fetchPostNum = async () => {
      const data = await getBoardPostNum(boardType);
      if (!data) {
        return; // error handling
      }

      setTotalPostNum(data?.postCount);
    };
    fetchPostNum();
  }, [boardType, announcementPosts]);

  // page reloading hook
  // useEffect(() => {
  //   window.history.pushState(
  //     {},
  //     `/boards/${boardType}?size=${pageSize}&page=${pageNum}`
  //   );
  // }, [pageNum, pageSize, boardType]);

  // Function to update URL params

  useEffect(() => {
    router.replace(`/boards/${boardType}?size=${pageSize}&page=${pageNum}`);
  }, [pageNum, pageSize]);

  if (totalPostNum === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`
    w-full
    flex flex-col gap-4  ${heebo.className}`}
    >
      <div className="flex md:hidden">
        <MobileBoardTable
          postStartIdx={totalPostNum - pageSize * (pageNum - 1)}
          posts={posts}
          announcementPosts={announcementPosts}
        />
      </div>
      <div className="hidden md:flex">
        <BoardTable
          postStartIdx={totalPostNum - pageSize * (pageNum - 1)}
          posts={posts}
          announcementPosts={announcementPosts}
        />
      </div>

      {/* Pagination Bar */}
      <div className="flex w-full">
        <div className="flex-1">
          <PageSizeSelector
            pageNum={pageNum}
            totalPostNum={totalPostNum}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>

        <div className="grow">
          <p></p>
          {/* TODO: improve pagination */}
          <Pagination
            totalPageNum={Math.ceil(totalPostNum / pageSize)}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        </div>
      </div>
    </div>
  );
}
