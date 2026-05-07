import Image from "next/image";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@umichkisa-ds/web";

export const metadata = {
  title: "소개",
  description:
    "키사 (KISA) 소개 페이지입니다. 인사말과 키사가 하는 일들이 간단히 정리 되어있습니다.",
};

const PILLARS = [
  {
    n: "01",
    title: "커뮤니티",
    desc: "신입생 환영회, 학기 중 정기 행사, 졸업식 행사로 학년·전공을 가로지르는 한인 네트워크를 만듭니다.",
  },
  {
    n: "02",
    title: "정보 제공",
    desc: "취업 가이드북, OPT·CPT·SSN 안내 등 유학생에게 꼭 필요한 자료를 정리해 한곳에서 제공합니다.",
  },
  {
    n: "03",
    title: "교류·이벤트",
    desc: "학부생, 대학원생, 동문, 그리고 캠퍼스 안팎 한인 단체와의 교류를 위한 기회의 장을 만듭니다.",
  },
  {
    n: "04",
    title: "대변·옹호",
    desc: "국내외 정세와 학내 이슈에 대해 미시간 한인 학생들의 목소리를 대변하고 의견을 정리해 전달합니다.",
  },
];

export default function KisaPage() {
  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* 1. Eyebrow + Korean display headline */}
      <header className="flex flex-col items-center text-center gap-6 pt-4">
        <p className="type-label tracking-[0.2em] text-brand-primary">
          <Badge variant="brand">SINCE 1998</Badge>
          <span className="mx-3 text-muted-foreground">·</span>
          <span className="text-brand-primary">소개</span>
        </p>
        <h1 className="type-display text-brand-primary text-balance max-w-3xl">
          미시간의 한인 학생들, 함께 만드는 공동체.
        </h1>
      </header>

      {/* 2. Full-bleed group photo (clean, no overlay) */}
      <figure
        className="relative -mx-4 md:-mx-6 lg:-mx-8 overflow-hidden"
        aria-label="KISA 2025-2026 단체 사진"
      >
        <div className="relative w-full aspect-[16/7]">
          <Image
            priority
            src="/kisa_all_2025-2026.png"
            alt="2025-2026 KISA 단체 사진"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </figure>

      {/* 3. 인사말 spread — desktop two-column, mobile stacked */}
      <section
        aria-labelledby="greeting-heading"
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Left meta sidebar — exactly 2 rows */}
        <aside className="md:col-span-4 lg:col-span-3">
          <dl className="flex flex-col gap-6 md:border-l md:border-brand-primary md:pl-6">
            <div className="flex flex-col gap-1">
              <dt className="type-caption tracking-[0.2em] text-muted-foreground">
                ESTABLISHED
              </dt>
              <dd className="type-h2 text-brand-primary">1998</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="type-caption tracking-[0.2em] text-muted-foreground">
                MEMBERS
              </dt>
              <dd className="type-h2 text-brand-primary">5,000+ alumni</dd>
            </div>
          </dl>
        </aside>

        {/* Right body column */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
          <h2 id="greeting-heading" className="type-h1 text-brand-primary">
            인사말
          </h2>

          <p className="type-body text-foreground">
            안녕하십니까, 미시간 대학교 학부 한인 학생회{" "}
            <strong className="text-brand-primary">KISA</strong>입니다. 1998년에
            설립된 이래, 현재까지 5,000명 가량의 한인 학부생들을 대표하고 있는{" "}
            <strong className="text-brand-primary">KISA</strong>는 미시간
            대학교에 재학중인 한인 학생들간의 긴밀한 공동체를 조성하고, 귀중한
            기회와 자원을 제공함으로써 한국인 유학생들에게 힘을 실어주기 위해
            노력합니다.
          </p>

          <blockquote className="border-l-4 border-brand-accent pl-6 py-2 flex flex-col gap-3">
            <p className="type-h3 text-brand-primary">
              &ldquo;KISA is a student-driven organization dedicated to
              empowering Korean international students by fostering a tight-knit
              community and providing valuable opportunities and resources.&rdquo;
            </p>
            <footer className="type-caption tracking-[0.2em] text-muted-foreground">
              &mdash; KISA MISSION STATEMENT
            </footer>
          </blockquote>

          <p className="type-body text-foreground">
            한인 유학생들의 유익하고 편리한 학교생활을 위해 힘쓰며, 학부생을
            비롯하여 캠퍼스 내외로 한인들 간의 다양한 교류가 원활하게 이루어질
            수 있도록 기회의 장을 형성하고, 더 나아가 필요에 따라 국내외 정세에
            대한 미시간 한인학생들의 목소리를 대변하는것을 목표로 합니다.
          </p>
        </div>
      </section>

      {/* 4. KISA가 하는 일 — light gray surface panel */}
      <section
        aria-labelledby="what-we-do-heading"
        className="bg-surface-subtle -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7 flex flex-col gap-3">
              <p className="type-label tracking-[0.2em] text-brand-primary">
                <Badge variant="brand">WHAT WE DO</Badge>
              </p>
              <h2
                id="what-we-do-heading"
                className="type-display text-brand-primary"
              >
                KISA가 하는 일
              </h2>
            </div>
            <p className="md:col-span-5 type-body text-muted-foreground">
              커뮤니티 형성, 정보 제공, 그리고 미시간 한인 학생들의 목소리를
              대변하는 것 — 학생회의 활동은 크게 네 갈래로 정리됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <Card key={p.n} className="h-full">
                <CardHeader className="flex flex-col gap-3">
                  <span
                    aria-hidden
                    className="type-h3 text-brand-accent"
                  >
                    {p.n}
                  </span>
                  <CardTitle as="h3" className="text-brand-primary">
                    {p.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground">
                    {p.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
