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
    <Card className="h-full">
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
          {/*
            Lead marker pill — maize-filled override (not in standard Badge
            variants). Composed against the brand color tokens directly so the
            "Lead" treatment reads as a structural badge, not a decorative one.
          */}
          {isLead ? (
            <Badge
              variant="brand"
              className="bg-brand-accent text-brand-primary"
            >
              Lead
            </Badge>
          ) : null}
          {role.map((pill) => (
            <Badge key={pill} variant="outline">
              {pill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
