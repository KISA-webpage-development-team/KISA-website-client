"use client";

import { useState } from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@umichkisa-ds/web";

import MemberCard from "@/features/about-page/components/MemberCard";
import {
  members_2025,
  members_2024,
  members_2023,
} from "@/features/about-page/data/memberPageData";
import type { Cohort, Member } from "@/features/about-page/data/memberPageData";

// Year-keys map to cohort objects. Ordered newest-first via descending sort
// on string keys ("25-26" > "24-25" > "23-24" lexicographically).
const membersData: Record<string, Cohort> = {
  "25-26": members_2025,
  "24-25": members_2024,
  "23-24": members_2023,
};

const sortedYears = Object.keys(membersData).sort().reverse();

// Collapse a president-tier role string into its short display label.
// Source roles include "President", "President Lead", "Vice President - OP",
// "Vice President - PR", "Vice President Lead" — we render only the
// rank label, never the team suffix.
function presidentBadgeLabel(role: string): string {
  return role.toLowerCase().includes("vice") ? "VICE PRESIDENT" : "PRESIDENT";
}

function PresidentCard({ member }: { member: Member }) {
  const label = presidentBadgeLabel(member.role[0] ?? "");
  return (
    <Card className="bg-brand-primary text-brand-foreground">
      <CardHeader>
        <Badge
          variant="brand"
          className="bg-brand-accent text-brand-primary self-start"
        >
          {label}
        </Badge>
        <CardTitle as="h2" className="text-brand-foreground">
          {member.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="type-body text-brand-foreground">
          {`${member.major} · Class of ${member.year}`}
        </p>
      </CardContent>
    </Card>
  );
}

export default function MembersPage() {
  const [selectedYear, setSelectedYear] = useState<string>(sortedYears[0]);
  const cohort = membersData[selectedYear];

  // Flat grid: presidents render in their own elevated row above; everyone
  // else (operations + public_relations) flows into a single mobile-first
  // grid in original cohort order.
  const flatMembers: Member[] = [
    ...cohort.operations,
    ...cohort.public_relations,
  ];
  const totalCount = cohort.presidents.length + flatMembers.length;

  return (
    <section className="flex flex-col gap-6">
      {/* Page header — title + Korean subtitle, with year picker right-aligned */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="type-h1 text-foreground">{selectedYear} Board</h1>
          <p className="type-body text-muted-foreground">학생회 조직도</p>
        </div>
        <div className="w-full md:w-auto">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger
              aria-label="Select cohort year"
              className="w-full md:w-40"
            />
            <SelectContent>
              {sortedYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Presidents tier — elevated navy cards, maize badge override */}
      <Grid
        columns={{ base: 1, md: 2 }}
        gap="component"
        aria-label="Presidents"
      >
        {cohort.presidents.map((p) => (
          <PresidentCard key={p.name} member={p} />
        ))}
      </Grid>

      {/* Members section header */}
      <div className="flex items-baseline justify-between">
        <h2 className="type-h2 text-foreground">Members</h2>
        <p className="type-caption text-muted-foreground">
          {totalCount} people
        </p>
      </div>

      {/* Members grid — flat, no sub-team headings */}
      <Grid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap="component"
        aria-label="Members"
      >
        {flatMembers.map((m) => (
          <MemberCard
            key={`${m.name}-${m.role.join("-")}`}
            name={m.name}
            major={m.major}
            year={m.year}
            role={m.role}
            isLead={m.isLead}
          />
        ))}
      </Grid>
    </section>
  );
}
