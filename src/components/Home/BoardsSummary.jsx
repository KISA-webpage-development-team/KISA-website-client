"use client";

import React, { useEffect, useState } from "react";

// need to change this api call to "getRecentPosts" and "getHotPosts"
import HomePostView from "./HomePostView";
import { getBoardPosts } from "../../service/board";

export default function BoardsSummary() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);

  // [TODO] 최신, 추천 게시글로 바꾸기

  // 지금은 자유게시판 + 학업 / 취업
  // useBoardPosts 대신 getBoardPosts로 api 콜을 줄이고 있음
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const res = await getBoardPosts("community", 10, 0);
        setRecentPosts(res.results.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAcademicJobPosts = async () => {
      try {
        const res = await getBoardPosts("academic-job", 10, 0);
        setHotPosts(res.results.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommunityPosts();
    fetchAcademicJobPosts();
  }, []);

  return (
    <div
      className="w-full
  flex flex-col justify-center 
  md:flex-row gap-4"
    >
      <HomePostView type="자유" posts={recentPosts} />
      <HomePostView type="학업/취업" posts={hotPosts} />
    </div>
  );
}
