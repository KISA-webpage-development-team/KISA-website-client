import type { ReactNode } from "react";

// Home featured carousel data — Instagram-generated items merged with
// hand-authored static items.
//
// Image lookup:
//   - For non-`llm-collected-*` ids: /public/carousel/{id}.png
//   - For `llm-collected-*` ids (Instagram-generated): use `imageUrl` directly

export interface CarouselItem {
  id: string;
  title: string;
  desc: ReactNode;
  url?: string;
  imageUrl?: string;
}

interface InstagramRawItem {
  id: string;
  title: string;
  desc: string;
  url?: string;
  imageUrl?: string;
}

const staticHomeCarousel: CarouselItem[] = [
  {
    id: "f25-26_kisa_yearbook",
    title: "KISA Yearbook 2025-26",
    desc: (
      <p>
        안녕하세요 미시간 졸업예정자 여러분, 여러분의 이야기로 채워질 Yearbook의
        주인공이 되어주세요. KISA Yearbook은 미시간에서 보낸 소중한 추억과
        경험들을 한 권의 앨범에 담는 프로젝트입니다. 단순한 기록을 넘어, 이곳에서
        보낸 시간들을 다시 떠올리고 서로의 이야기를 나누는 의미 있는 여정을 함께
        하고자 합니다.
      </p>
    ),
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdUMtf0DisuJtBcjsI8GjVu7NujMTwHC-pODtApDTN-Hg7E4w/viewform",
  },
];

// Try to import generated Instagram JSON (if present). The file is generated
// by the insta-to-carousel script; absent in dev/CI, present in prod builds.
let instagramGenerated: InstagramRawItem[] = [];
try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  instagramGenerated = require("./instagramCarousel.generated.json") as InstagramRawItem[];
} catch {
  instagramGenerated = [];
}

const getInstagramItems = (): CarouselItem[] =>
  (instagramGenerated || []).map((it) => ({
    id: it.id,
    title: it.title,
    desc: <p>{it.desc}</p>,
    url: it.url,
    imageUrl: it.imageUrl,
  }));

const MAX_INSTAGRAM_ITEMS = 6;

const mergeCarouselData = (
  instagramItems: CarouselItem[],
  staticItems: CarouselItem[]
): CarouselItem[] => {
  const merged: CarouselItem[] = [];
  const seen = new Set<string>();

  for (const i of instagramItems.slice(0, MAX_INSTAGRAM_ITEMS)) {
    if (!seen.has(i.id)) {
      merged.push(i);
      seen.add(i.id);
    }
  }
  for (const s of staticItems) {
    if (!seen.has(s.id)) {
      merged.push(s);
      seen.add(s.id);
    }
  }
  return merged;
};

const homeCarouselData = mergeCarouselData(
  getInstagramItems(),
  staticHomeCarousel
);

export {
  staticHomeCarousel,
  getInstagramItems,
  mergeCarouselData,
  homeCarouselData,
};
