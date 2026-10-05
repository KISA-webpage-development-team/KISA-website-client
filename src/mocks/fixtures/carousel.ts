import type { AdminCarouselItem } from "@/types/carousel";

/**
 * Carousel fixtures — seed data for the MSW carousel handlers.
 *
 * Dates are relative to the real today so the live / expired split holds
 * whenever mock mode runs: ids 1–3 are live, 4 is expired (stored live, end
 * date passed), 5–6 are archived.
 */
const dayOffset = (offset: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
};

const ADMIN = "admin@umich.edu";

const base = (
  id: number,
  overrides: Partial<AdminCarouselItem>
): AdminCarouselItem => ({
  carouselItemID: id,
  title: `Carousel item ${id}`,
  description: "<p>Description</p>",
  link: null,
  imageUrl: "/kisa_all_2025-2026.webp",
  endDate: null,
  status: "live",
  position: null,
  archivedAt: null,
  createdBy: ADMIN,
  updatedBy: ADMIN,
  created: "2026-09-01T12:00:00",
  updated: "2026-09-01T12:00:00",
  ...overrides,
});

export const mockCarouselItems: AdminCarouselItem[] = [
  base(1, {
    title: "2026 가을학기 Mass Meeting",
    description:
      "<p>KISA의 새 학기를 여는 <strong>Mass Meeting</strong>에 초대합니다.</p><p>신입생과 재학생 모두 환영해요.</p>",
    link: "https://forms.gle/example-mass-meeting",
    endDate: dayOffset(7),
    position: 0,
  }),
  base(2, {
    title: "KISA 소모임 신청",
    description: "<p>관심사가 맞는 사람들과 한 학기 동안 함께하세요. <em>선착순</em> 마감입니다.</p>",
    link: "https://forms.gle/example-small-group",
    endDate: dayOffset(21),
    position: 1,
    imageUrl: "/kisa_logo_2026.png",
  }),
  base(3, {
    title: "KISA 공식 인스타그램",
    description: "<p>행사 소식은 인스타그램에서 가장 먼저 확인할 수 있어요.</p>",
    link: "https://instagram.com/kisa_michigan",
    position: 2,
  }),
  base(4, {
    title: "여름 네트워킹 행사",
    endDate: dayOffset(-3),
    position: 3,
    status: "archive",
  }),
  base(5, {
    title: "2025 겨울학기 Pocha",
    description: "<p>지난 학기 포차에 와주셔서 감사합니다.</p>",
    status: "archive",
    archivedAt: "2026-02-20T12:00:00",
  }),
  base(6, {
    title: "KISA Yearbook 2025-26",
    description: "<p>여러분의 이야기로 채워질 Yearbook의 주인공이 되어주세요.</p>",
    link: "https://forms.gle/example-yearbook",
    status: "archive",
    archivedAt: "2026-05-01T12:00:00",
  }),
];
