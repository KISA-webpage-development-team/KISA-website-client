import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@umichkisa-ds/web";

import type { BoardEntry } from "@/types/members";

// Collapse a president-tier role string into its short display label.
// Roles include "President", "President Lead", "Vice President - OP",
// "Vice President Lead" — only the rank label is rendered, never the team
// suffix.
export function presidentBadgeLabel(role: string): string {
  return role.toLowerCase().includes("vice") ? "VICE PRESIDENT" : "PRESIDENT";
}

type PresidentCardProps = Pick<
  BoardEntry,
  "name" | "major" | "classYear" | "roles"
>;

/** Elevated navy card for a president-tier entry, with a maize rank badge. */
export default function PresidentCard({
  name,
  major,
  classYear,
  roles,
}: PresidentCardProps) {
  const label = presidentBadgeLabel(roles[0] ?? "");
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
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="type-body text-brand-foreground">
          {`${major} · Class of ${classYear}`}
        </p>
      </CardContent>
    </Card>
  );
}
