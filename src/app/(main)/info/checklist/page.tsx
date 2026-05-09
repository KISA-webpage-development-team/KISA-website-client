import type { Metadata } from "next";
import { Container } from "@umichkisa-ds/web";
import CheckList from "@/features/info-page/components/CheckList";

export const metadata: Metadata = {
  title: "처음 와서 할 일",
  description:
    "미시간 대학교에 처음 와서 할 체크 리스트입니다. 신입생을 위한 정보 뿐만 아니라, 운전면허, 신분증 등 다양한 유용한 정보들이 있습니다.",
};

export default function InfoCheckListPage() {
  return (
    <Container
      as="section"
      size="md"
      className="flex flex-col gap-8 md:gap-10 lg:gap-12 !p-0"
    >
      {/* Page hero */}
      <header className="flex flex-col w-full gap-4 text-center items-center">
        <h1 className="type-h1">Things to Do · 처음 와서 할 일</h1>
        <p className="type-body text-foreground max-w-prose">
          우선 미시간 대학교에 합격하신 것을 축하드립니다. Offer Letter 를 받고
          어떤 것부터 해야 될지 막막하실 여러분들을 위해 타임라인 예시와 어떤
          것을 해야 하는지 정리했습니다. 대부분의 것들을 작성했지만 해마다
          필요한 정보 및 제출해야 할 서류가 다를 수 있기에 정확한 정보는 꼭 학교
          공식 이메일 혹은 웹사이트를 통해서 확인해 주시기 바랍니다.
        </p>
      </header>

      {/* Checklist accordion */}
      <CheckList />
    </Container>
  );
}
