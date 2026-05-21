import React from "react";
import type { Review } from "@/types/course";

type ReviewItemProps = {
  review: Review;
  onLike: (reviewid: number) => void;
};

export default function ReviewItem({ review, onLike }: ReviewItemProps) {
  function handleLike() {
    onLike(review.reviewid);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {review.semester} · {review.authorName}
        </span>
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-michigan-blue"
          aria-label="좋아요"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span>{review.likesCount}</span>
        </button>
      </div>

      <p className="mb-3 text-sm text-gray-700">
        {review.courseComment}
      </p>

      {review.professors.map((prof) => (
        <div
          key={prof.name}
          className="rounded-md bg-gray-50 px-3 py-2 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{prof.name}</span>
            <span className="text-yellow-500">{"★".repeat(prof.rating)}</span>
          </div>
          <p className="mt-0.5 text-gray-500">{prof.comment}</p>
        </div>
      ))}
    </div>
  );
}
