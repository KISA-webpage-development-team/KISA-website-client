import React from "react";
import ComponentA from "../../components/Test/ComponentA";
import ComponentB from "../../components/Test/ComponentB";
import KisaAll from "../../components/About/KisaAll";

export const dynamic = "force-static";

export default function RenderingTestPage() {
  return (
    <div className="flex flex-col gap-10">
      <ComponentA />

      <KisaAll />

      <ComponentB />
    </div>
  );
}
