import client from "@/lib/axios/client";
import type { NewReviewBody, Review } from "@/types/course";

type Token = string | undefined;

/** @route POST /courses/:code/reviews */
export async function createReview(
  code: string,
  data: NewReviewBody,
  token: Token
): Promise<Review> {
  const url = `/courses/${encodeURIComponent(code)}/reviews`;
  try {
    const response = await client.post<Review>(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("리뷰 등록에 실패했습니다.");
  }
}

/** @route POST /courses/:code/reviews/:reviewid/likes */
export async function likeReview(
  code: string,
  reviewid: number,
  token: Token
): Promise<void> {
  const url = `/courses/${encodeURIComponent(code)}/reviews/${reviewid}/likes`;
  try {
    await client.post(
      url,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
    throw new Error("좋아요 처리에 실패했습니다.");
  }
}
