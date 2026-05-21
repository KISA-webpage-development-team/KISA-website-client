import { Grid } from "@umichkisa-ds/web";
import SponsorBanner from "@/features/about-page/components/SponsorBanner";
import { sponsorData } from "@/features/home-sponsor/data/sponsorData";

export const metadata = {
  title: "스폰서 소개",
  description: "KISA를 후원해주시는 기업 및 단체입니다.",
};

export default function SponsorPage() {
  return (
    <section>
      <h1 className="type-h1">스폰서 소개</h1>

      <Grid
        columns={{ base: 2, md: 3, lg: 4 }}
        gap="component"
        className="mt-6"
      >
        {sponsorData.map((sponsor) => (
          <SponsorBanner key={sponsor.id} sponsor={sponsor} />
        ))}
      </Grid>
    </section>
  );
}
