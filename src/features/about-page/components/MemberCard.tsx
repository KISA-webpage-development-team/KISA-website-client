import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Divider,
} from "@umichkisa-ds/web";

import type { Member } from "@/features/about-page/data/memberPageData";

type MemberCardProps = Pick<Member, "name" | "major" | "year" | "role"> & {
  isLead?: boolean;
};

export default function MemberCard({
  name,
  major,
  year,
  role,
  isLead,
}: MemberCardProps) {
  return (
    <Card hoverable className="h-full">
      <CardHeader>
        <CardTitle as="h3">
          {name}
        </CardTitle>
        <p className="type-caption text-muted-foreground">
          {`${major} | ${year}`}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Divider />
        <div className="flex flex-wrap gap-2">
          {role.map((pill) => (
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
