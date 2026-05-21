"use client";

import React, { useState } from "react";
import { useTypedSession } from "@/lib/next-auth/useTypedSession";
import { useCourse, useCourseJokbo } from "@/apis/courses/swrHooks";
import { useReviews } from "@/features/course-evaluation/hooks/useReviews";
import CourseHeader from "@/features/course-evaluation/components/course-detail/CourseHeader";
import CourseTabBar, {
  type CourseTab,
} from "@/features/course-evaluation/components/course-detail/CourseTabBar";
import ReviewList from "@/features/course-evaluation/components/course-detail/ReviewList";
import JokboList from "@/features/course-evaluation/components/course-detail/JokboList";
import WriteReviewModal from "@/features/course-evaluation/components/course-detail/WriteReviewModal";

type CourseDetailPageProps = {
  params: { code: string };
};

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const courseCode = decodeURIComponent(params.code);
  const { data: session } = useTypedSession();
  const token = session?.token;

  const { course, isLoading: courseLoading, error: courseError } =
    useCourse(courseCode);
  const {
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    handleLike,
    refreshReviews,
  } = useReviews(courseCode, token);
  const { jokboFiles, isLoading: jokboLoading, error: jokboError } =
    useCourseJokbo(courseCode);

  const [activeTab, setActiveTab] = useState<CourseTab>("리뷰");

  const isLoading = courseLoading || reviewsLoading || jokboLoading;

  if (isLoading) return null;

  if (courseError || reviewsError || jokboError)
    throw new Error("강의 정보를 불러오는 데 실패했습니다.");

  if (!course) throw new Error("Not Found");

  const tabContent =
    activeTab === "리뷰" ? (
      <ReviewList reviews={reviews} onLike={handleLike} />
    ) : (
      <JokboList files={jokboFiles} />
    );

  const actionButton =
    activeTab === "리뷰" ? (
      <WriteReviewModal
        courseCode={courseCode}
        token={token}
        onSuccess={refreshReviews}
      />
    ) : null;

  return (
    <div className="flex flex-col gap-5 py-6">
      <CourseHeader course={course} />
      <CourseTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex justify-end">{actionButton}</div>
      {tabContent}
    </div>
  );
}
