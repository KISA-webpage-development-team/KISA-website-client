import React from "react";
import InfoTitle from "@/components/shared/InfoTitle";
import SponsorByTier from "@/components/About/SponsorByTier";

export default function SponsorPage() {
  const groupByDivision = (sponsors) => {
    const grouped = {
      Gold: [],
      Silver: [],
      Bronze: [],
    };

    sponsors.forEach((sponsor) => {
      if (grouped[sponsor.division]) {
        grouped[sponsor.division].push(sponsor);
      }
    });
    return grouped;
  };

  const groupedSponsors = groupByDivision(sponsorsFakeData);

  return (
    // Note: This is when we divide the tiers.
    // <section className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 gap-8 md:gap-16">
    //   <InfoTitle title="스폰서 소개" />
    //   {Object.entries(groupedSponsors).map(([division, sponsors]) => (
    //     <div key={division} className="w-full">
    //       <h2 className="text-2xl font-bold mb-4">{division} Sponsors</h2>
    //       <div className="flex gap-4">
    //         {sponsors.map((sponsor) => (
    //           <SponsorByTier key={sponsor.sponsorId} sponsor={sponsor} />
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </section>
    // <section className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 gap-8 md:gap-16">
    <section>
      <InfoTitle title="스폰서 소개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 sm:gap-4 px-10">
        {sponsorsFakeData.map((sponsor) => (
          <SponsorByTier key={sponsor.sponsorId} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}

const sponsorsFakeData = [
  {
    sponsorId: "1",
    link: "https://google.com",
    division: "Gold",
    imageTitle: "Google",
  },
  {
    sponsorId: "2",
    link: "https://apple.com",
    division: "Gold",
    imageTitle: "Apple",
  },
  {
    sponsorId: "3",
    link: "https://youtube.com",
    division: "Silver",
    imageTitle: "Youtube",
  },
  {
    sponsorId: "4",
    link: "https://instagram.com",
    division: "Bronze",
    imageTitle: "Instagram",
  },
  {
    sponsorId: "5",
    link: "https://naver.com",
    division: "Gold",
    imageTitle: "Naver",
  },
  {
    sponsorId: "6",
    link: "https://meta.com",
    division: "Gold",
    imageTitle: "Meta",
  },
];
