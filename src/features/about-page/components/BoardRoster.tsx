import { Grid } from "@umichkisa-ds/web";

import type { BoardEntry } from "@/types/members";
import MemberCard from "./MemberCard";
import PresidentCard from "./PresidentCard";

type BoardRosterProps = {
  presidents: BoardEntry[];
  members: BoardEntry[];
};

/**
 * One board year's roster: president-tier entries as the elevated row, then
 * every member-tier entry in one grid, in the given order. Shared by the
 * public members page and the members admin preview.
 */
export default function BoardRoster({ presidents, members }: BoardRosterProps) {
  const totalCount = presidents.length + members.length;

  return (
    <>
      {/* Presidents tier — elevated navy cards, maize badge override */}
      <Grid
        columns={{ base: 1, md: 2 }}
        gap="component"
        aria-label="Presidents"
      >
        {presidents.map((entry) => (
          <PresidentCard
            key={entry.boardMemberID}
            name={entry.name}
            major={entry.major}
            classYear={entry.classYear}
            roles={entry.roles}
          />
        ))}
      </Grid>

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
        {members.map((entry) => (
          <MemberCard
            key={entry.boardMemberID}
            name={entry.name}
            major={entry.major}
            classYear={entry.classYear}
            roles={entry.roles}
            isLead={entry.isLead}
          />
        ))}
      </Grid>
    </>
  );
}
