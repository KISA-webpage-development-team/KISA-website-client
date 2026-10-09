import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Divider,
} from "@umichkisa-ds/web";

import type { BoardEntry } from "@/types/members";

type MemberCardProps = Pick<
  BoardEntry,
  "name" | "major" | "classYear" | "roles" | "isLead"
>;

export default function MemberCard({
  name,
  major,
  classYear,
  roles,
  isLead,
}: MemberCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle as="h3">{name}</CardTitle>
        <p className="type-caption text-muted-foreground">
          {`${major} | ${classYear}`}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Divider />
        <div className="flex flex-wrap gap-2">
          {roles.map((pill) => (
            <Badge
              key={pill}
              variant="default"
              className={
                isLead
                  ? "bg-brand-accent-subtle text-brand-primary border-brand-accent"
                  : ""
              }
            >
              {pill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
