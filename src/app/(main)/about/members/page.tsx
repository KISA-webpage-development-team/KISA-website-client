import { getBoardYears } from "@/apis/members/queries";
import MembersView from "@/features/about-page/components/MembersView";

export default async function MembersPage() {
  const boardYears = await getBoardYears();

  return <MembersView boardYears={boardYears} />;
}
