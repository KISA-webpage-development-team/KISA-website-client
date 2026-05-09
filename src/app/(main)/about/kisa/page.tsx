import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Grid,
} from "@umichkisa-ds/web";

export const metadata = {
  title: "소개",
  description:
    "키사 (KISA) 소개 페이지입니다. 인사말과 키사가 하는 일들이 간단히 정리되어 있습니다.",
};

type Stat = { label: string; value: string };

const STATS: Stat[] = [
  { label: "ESTABLISHED", value: "1998" },
  { label: "MEMBERS", value: "5,000+ alumni" },
];

type Pillar = { index: string; title: string; desc: string };

const PILLARS: Pillar[] = [
  {
    index: "01",
    title: "커뮤니티",
    desc: "신입생 환영회, 학기 중 정기 행사, 졸업식 행사로 학년·전공을 가로지르는 한인 네트워크를 만듭니다.",
  },
  {
    index: "02",
    title: "정보 제공",
    desc: "취업 가이드북, OPT·CPT·SSN 안내 등 유학생에게 꼭 필요한 자료를 정리해 한곳에서 제공합니다.",
  },
  {
    index: "03",
    title: "교류 · 이벤트",
    desc: "학부생, 대학원생, 동문, 그리고 캠퍼스 안팎 한인 단체와의 교류를 위한 기회의 장을 만듭니다.",
  },
  {
    index: "04",
    title: "대변 · 옹호",
    desc: "국내외 정세와 학내 이슈에 대해 미시간 한인 학생들의 목소리를 대변하고 의견을 정리해 전달합니다.",
  },
];

export default function KisaPage() {
  return (
    <section className="flex flex-col gap-24 md:gap-32 lg:gap-36">
      {/* Editorial hero */}
      <div className="flex flex-col items-center gap-2 md:gap-4 lg:gap-6 text-center">
        <h1 className="type-display text-foreground max-w-3xl">
          미시간의 한인 학생들,
          <br />
          함께 만드는 공동체.
        </h1>

        {/* Group photo */}
        <figure className="w-full mt-4">
          <div className="relative w-full overflow-hidden rounded-lg border border-border bg-surface-subtle aspect-[2400/1050]">
            <Image
              src="/kisa_all_2025-2026.png"
              alt="KISA 2025-2026 단체 사진"
              fill
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between">
            <span className="type-caption text-muted-foreground uppercase">
              KISA 2025-26
            </span>
            <span className="type-caption text-muted-foreground">
              University of Michigan, Ann Arbor
            </span>
          </figcaption>
        </figure>
      </div>

      {/* 인사말 — two-column with stats sidebar */}
      <div
        aria-labelledby="greeting-heading"
        className="flex flex-col md:flex-row gap-10 w-full"
      >
        {/* Sidebar — stats */}
        <aside className="md:w-64 md:shrink-0">
          <dl className="flex flex-col">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i === 0
                    ? "flex flex-col gap-2 border-y border-border py-4"
                    : "flex flex-col gap-2 border-b border-border py-4"
                }
              >
                <dt className="type-caption text-muted-foreground tracking-widest uppercase">
                  {stat.label}
                </dt>
                <dd className="type-label text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        {/* Main column — narrative copy + mission pull-quote */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full md:min-w-0">
          <h2 id="greeting-heading" className="type-h1 text-foreground">
            인사말
          </h2>

          <p className="type-body text-foreground">
            안녕하십니까, 미시간 대학교 학부 한인 학생회 <strong>KISA</strong>
            입니다.
          </p>

          <p className="type-body text-foreground">
            1998년에 설립된 이래, 현재까지 5,000명 가량의 한인 학부생들을
            대표하고 있는 KISA는 미시간 대학교에 재학중인 한인 학생들간의 긴밀한
            공동체를 조성하고, 귀중한 기회와 자원을 제공함으로써 한국인
            유학생들에게 힘을 실어주기 위해 노력합니다.
          </p>

          <blockquote className="border-l-4 border-brand-accent pl-6 py-2 my-2 flex flex-col gap-3">
            <p className="type-h3 text-brand-primary">
              &ldquo;KISA is a student-driven organization dedicated to
              empowering Korean international students by fostering a tight-knit
              community and providing valuable opportunities and
              resources.&rdquo;
            </p>
            <cite className="type-caption text-muted-foreground tracking-widest uppercase not-italic">
              — KISA Mission Statement
            </cite>
          </blockquote>

          <p className="type-body text-foreground">
            한인 유학생들의 유익하고 편리한 학교생활을 위해 힘쓰며, 학부생을
            비롯하여 캠퍼스 내외로 한인들 간의 다양한 교류가 원활하게 이루어질
            수 있도록 기회의 장을 형성하고, 더 나아가 필요에 따라 국내외 정세에
            대한 미시간 한인학생들의 목소리를 대변하는 것을 목표로 합니다.
          </p>
        </div>
      </div>

      {/* What we do — KISA가 하는 일 */}
      <div
        aria-labelledby="what-we-do-heading"
        className="flex flex-col gap-4 md:gap-6 lg:gap-8 "
      >
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <h2 id="what-we-do-heading" className="type-h1 text-foreground">
            KISA가 하는 일
          </h2>
          <p className="type-body text-muted-foreground md:self-end">
            커뮤니티 형성, 정보 제공, 그리고 미시간 한인 학생들의 목소리를
            대변하는 것 — 학생회의 활동은 크게 네 갈래로 정리됩니다.
          </p>
        </div>

        <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="component">
          {PILLARS.map((p) => (
            <Card key={p.index}>
              <CardHeader>
                <span className="type-caption text-muted-foreground">
                  {p.index}
                </span>
                <CardTitle as="h3">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{p.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  );
}
