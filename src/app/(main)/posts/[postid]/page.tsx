// Post View page (/posts/[postid])
//
// Server-component shell. The actual data + interactivity live in
// PostDetailClient (CSR + SWR).

import PostDetailClient from "@/features/bulletin-board/components/post-view/PostDetailClient";

type PageProps = {
  params: {
    postid: string;
  };
};

export default function PostViewPage({ params }: PageProps) {
  return (
    <section className="w-full h-full">
      <PostDetailClient postid={Number(params.postid)} />
    </section>
  );
}
