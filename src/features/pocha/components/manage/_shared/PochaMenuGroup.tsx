import { Badge } from "@umichkisa-ds/web";
import { MenuItemRaw } from "@/types/pocha";

interface PochaMenuGroupProps {
  label: string;
  items: MenuItemRaw[];
}

export default function PochaMenuGroup({ label, items }: PochaMenuGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="type-body-sm text-muted-foreground">
        {label} · {items.length}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((menu) => (
          <Badge
            key={menu.menuID ?? menu.nameKor}
            variant="outline"
            size="md"
          >
            {menu.nameKor}
          </Badge>
        ))}
      </div>
    </div>
  );
}
