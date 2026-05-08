import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Divider,
  Icon,
} from "@umichkisa-ds/web";

import type { Contributor } from "@/features/about-page/data/memberCreditData";

// Compress the year-keys a contributor served into a single tag — single year
// renders verbatim ("25-26"); multiple years collapse to earliest-start →
// latest-end ("23-26"). String sort works because year-keys are zero-padded.
function yearRangeTag(years: string[]): string {
  if (years.length === 1) return years[0];
  const sorted = [...years].sort();
  const earliest = sorted[0];
  const latest = sorted[sorted.length - 1];
  const earliestStart = earliest.split("-")[0];
  const latestEnd = latest.split("-")[1];
  return `${earliestStart}-${latestEnd}`;
}

export default function CreditCard({ contributor }: { contributor: Contributor }) {
  const { name, email, role, description, github, linkedin, years } =
    contributor;
  const range = yearRangeTag(years);

  return (
    <Card hoverable className="flex h-full flex-col">
      <CardHeader>
        <CardTitle as="h3">
          {name}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">{role}</Badge>
          <Badge variant="default">{range}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {description ? (
          <p className="type-body text-foreground">{description}</p>
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <Divider />
        <Link
          href={`mailto:${email}`}
          className="type-body-sm text-muted-foreground hover:text-link"
        >
          {email}
        </Link>
        <div className="flex items-center gap-4">
          {github ? (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on GitHub`}
              className="text-muted-foreground hover:text-brand-primary transition-colors"
            >
              <Icon name="github" size="md" />
            </Link>
          ) : null}
          {linkedin ? (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="text-muted-foreground hover:text-brand-primary transition-colors"
            >
              <Icon name="linkedin" size="md" />
            </Link>
          ) : null}
          <Link
            href={`mailto:${email}`}
            aria-label={`Email ${name}`}
            className="text-muted-foreground hover:text-brand-primary transition-colors"
          >
            <Icon name="mail" size="md" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
