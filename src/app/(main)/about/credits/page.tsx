import { Grid } from "@umichkisa-ds/web";

import CreditCard from "@/features/about-page/components/CreditCard";
import { credits } from "@/features/about-page/data/memberCreditData";

export const metadata = {
  title: "Credits",
  description:
    "UMich KISA 웹사이트를 만들어 온 기여자들을 소개합니다. 학기마다 새로운 빌더가 합류합니다.",
};

export default function CreditsPage() {
  return (
    <section className="flex flex-col gap-6">
      {/* Page header — title + Korean subtitle */}
      <header className="flex flex-col gap-2">
        <h1 className="type-h1 text-foreground">Credits</h1>
        <p className="type-body text-muted-foreground">
          UMich KISA 웹사이트를 만들고 있는 사람들입니다. 학기마다 새로운
          기여자가 합류합니다.
        </p>
      </header>

      {/* Contributors header — cumulative count right-aligned */}
      <div className="flex items-baseline justify-between">
        <h2 className="type-h2 text-foreground">Contributors</h2>
        <p className="type-caption text-muted-foreground">
          {credits.length} builders
        </p>
      </div>

      {/* Flat credits grid — single source of truth, ordered newest-first */}
      <Grid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap="component"
        aria-label="Contributors"
      >
        {credits.map((c) => (
          <CreditCard key={c.email} contributor={c} />
        ))}
      </Grid>
    </section>
  );
}
