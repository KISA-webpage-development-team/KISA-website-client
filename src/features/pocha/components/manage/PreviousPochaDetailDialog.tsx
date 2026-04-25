import {
  Alert,
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Divider,
  Icon,
  LoadingSpinner,
} from "@umichkisa-ds/web";

import useAdmin from "@/lib/next-auth/useAdmin";
import useMenu from "@/features/pocha/hooks/useMenu";
import { convertMenuByCategoryToRawList } from "@/features/pocha/utils/convertMenuType";
import {
  MenuByCategory,
  MenuItemRaw,
  PochaInfoWithoutStatus,
} from "@/types/pocha";
import {
  formatDateInTz,
  formatTimeInTz,
  tzAbbreviation,
} from "@/utils/formats/timezone";

interface PreviousPochaDetailDialogProps {
  pocha: PochaInfoWithoutStatus | null;
  onClose: () => void;
}

export default function PreviousPochaDetailDialog({
  pocha,
  onClose,
}: PreviousPochaDetailDialogProps) {
  const open = pocha !== null;
  const { token } = useAdmin();

  // useMenu already guards with `pochaID && token ? [key] : null`,
  // so a 0 or empty token won't fetch.
  const { menuList, status } = useMenu(pocha?.pochaID ?? 0, token ?? "");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent size="md">
        {pocha && (
          <>
            <DialogTitle className="!font-semibold">
              {pocha.title}
            </DialogTitle>
            {pocha.description && (
              <DialogDescription>{pocha.description}</DialogDescription>
            )}

            <Divider />

            <div className="grid grid-cols-2 gap-4">
              <DateBlock label="시작" date={pocha.startDate} />
              <DateBlock label="종료" date={pocha.endDate} />
            </div>

            <Divider />

            <div className="flex flex-col gap-3">
              <p className="type-body-sm text-muted-foreground">메뉴</p>
              <MenuSection status={status} menuList={menuList} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function DateBlock({
  label,
  date,
}: {
  label: string;
  date: Date | string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon name="calendar" size="sm" />
        <span className="type-body-sm">{label}</span>
      </div>
      <p className="type-h4 !font-semibold text-foreground">
        {formatDateInTz(date)}
      </p>
      <p className="type-body-sm text-muted-foreground">
        {formatTimeInTz(date)} ({tzAbbreviation(date)})
      </p>
    </div>
  );
}

function MenuSection({
  status,
  menuList,
}: {
  status: string;
  menuList: MenuByCategory[] | undefined;
}) {
  if (status === "loading") {
    return (
      <div className="flex justify-center py-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <Alert variant="error">메뉴를 불러오지 못했습니다.</Alert>;
  }

  const items = convertMenuByCategoryToRawList(menuList ?? []);
  if (items.length === 0) {
    return <Alert variant="info">등록된 메뉴가 없습니다.</Alert>;
  }

  const immediatePrepMenus = items.filter((m) => m.isImmediatePrep);
  const cookingMenus = items.filter((m) => !m.isImmediatePrep);

  return (
    <div className="flex flex-col gap-4">
      {immediatePrepMenus.length > 0 && (
        <MenuGroup label="즉시 제공" items={immediatePrepMenus} />
      )}
      {cookingMenus.length > 0 && (
        <MenuGroup label="조리 필요" items={cookingMenus} />
      )}
    </div>
  );
}

function MenuGroup({
  label,
  items,
}: {
  label: string;
  items: MenuItemRaw[];
}) {
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
