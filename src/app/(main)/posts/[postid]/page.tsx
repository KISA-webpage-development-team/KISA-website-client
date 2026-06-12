// Post View page (/posts/[postid])
//
// Server-component shell. The actual data + interactivity live in
// PostDetailClient (CSR + SWR).

import PostDetailClient from "@/features/bulletin-board/components/post-view/PostDetailClient";

type PageProps = {
  params: Promise<{
    postid: string;
  }>;
};

export default async function PostViewPage({ params }: PageProps) {
  const { postid } = await params;
  return (
    <section className="w-full h-full">
      <PostDetailClient postid={Number(postid)} />
    </section>
  );
}
