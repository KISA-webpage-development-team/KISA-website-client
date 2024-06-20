import { SWRTokenProvider } from "../../context/SWRProvider";
import "./posts.css";

export default async function PostLayout({ children }) {
  return <SWRTokenProvider>{children}</SWRTokenProvider>;
}
