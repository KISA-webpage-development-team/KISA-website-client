"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@umichkisa-ds/web";

import InfoAccordion from "./InfoAccordion";
import { usInfoContents, koreaInfoContents } from "../../data/infoContents";
import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import type { SupportedCountry } from "../../types/jobs";

export default function JobApplicationInfoContents() {
  const { country, setCountry } = useJobsCurator();

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="type-h1 text-foreground">미국·한국 취업 가이드북</h1>
      <p className="type-body text-foreground text-center max-w-xl px-2">
        지원 시기부터 레쥬메와 네트워킹 전략까지, 인턴 준비의 기본기를 한눈에
        확인하세요. 또한 선배들의 실제 경험담과 리서치 지원 사례, 유학생이 꼭
        알아야 할 OPT·SSN 정보까지 담았습니다.
      </p>

      <Tabs
        value={country}
        onValueChange={(v) => setCountry(v as SupportedCountry)}
        variant="pill"
        className="w-full max-w-3xl"
      >
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="US">미국</TabsTrigger>
            <TabsTrigger value="KR">한국</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="US" className="px-4">
          <InfoAccordion infoContents={usInfoContents} />
        </TabsContent>
        <TabsContent value="KR" className="px-4">
          <InfoAccordion infoContents={koreaInfoContents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
