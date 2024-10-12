import DongsubButton from "@/components/DongsubButton";
import DongsubImage from "@/components/DongsubImage";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
export default function OnboardingPage() {
  return (
    <div>
      <h1 className="text-3xl text-yellow-700">안녕?</h1>
      <p className="text-pink-500">다같이 웹사이트를 공부해보자</p>
      <DongsubButton />
      <DongsubImage />
    </div>
  );
}
