// User Page의 모든 api call은 token이 필요하므로, fetcherWithToken을 사용하도록 설정
// [NOTE] this is still server component

import { SWRTokenProvider } from "../../context/SWRProvider";

export default function UserLayout({ children }) {
  return <SWRTokenProvider>{children}</SWRTokenProvider>;
}
