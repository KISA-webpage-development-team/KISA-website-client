import "./board.css";

export const metadata = {
  title: "게시판",
  description:
    "미시간 대학교 커뮤니티 게시판입니다. 여러분의 이야기를 들려주세요.",
};

export default async function BoardLayout({ children }) {
  return <>{children}</>;
}
