import React from "react";
import type { Review } from "@/types/course";
import ReviewItem from "./ReviewItem";

type ReviewListProps = {
  reviews: Review[];
  onLike: (reviewid: number) => void;
};

export default function ReviewList({ reviews, onLike }: ReviewListProps) {
  const isEmpty = reviews.length === 0;

  const emptyContent = (
    <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
      <p className="text-sm">아직 등록된 리뷰가 없습니다. 첫 번째 리뷰를 남겨보세요!</p>
    </div>
  );

  if (isEmpty) return emptyContent;

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((review) => (
        <ReviewItem key={review.reviewid} review={review} onLike={onLike} />
      ))}
    </div>
  );
}
