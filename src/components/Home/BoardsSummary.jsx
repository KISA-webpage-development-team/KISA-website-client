"use client";

import React, { useEffect, useState } from "react";

// need to change this api call to "getRecentPosts" and "getHotPosts"
import { getBoardPosts } from "../../service/board";
import HomePostView from "./HomePostView";

export default function BoardsSummary() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      const data = await getBoardPosts("community", 10, 0);
      setRecentPosts(data?.results.slice(0, 5));
    };
    const fetchHotPosts = async () => {
      const data = await getBoardPosts("community", 10, 0);
      setHotPosts(data?.results.slice(0, 5));
    };
    // fetchRecentPosts();
    // fetchHotPosts();
  }, []);

  return (
    <div
      className="w-full
  flex flex-col justify-center 
  md:flex-row gap-4"
    >
      <HomePostView type="최신" posts={recentPosts} />
      <HomePostView type="추천" posts={hotPosts} />
    </div>
  );
}
