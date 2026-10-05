"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
} from "@umichkisa-ds/web";
import {
  categoryLabels,
  kisaPicks,
  type KisaPick,
  type KisaPickCategory,
} from "@/features/info-page/kisa-picks/kisaPicksData";

const categories = Object.keys(categoryLabels) as KisaPickCategory[];

const emptyPick: KisaPick = {
  id: "new_pick",
  name: "New pick",
  category: "restaurant",
  cuisine: "",
  area: "",
  lat: 42.2808,
  lng: -83.743,
  note: "",
  whatToOrder: [],
  tags: [],
  image: "/images/umich.webp",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ann+Arbor",
};

function toList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toCsv(items: string[] | undefined) {
  return items?.join(", ") ?? "";
}

function normalizeId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export default function KisaPicksAdminView() {
  const [drafts, setDrafts] = useState<KisaPick[]>(kisaPicks);
  const [selectedId, setSelectedId] = useState(kisaPicks[0]?.id ?? emptyPick.id);
  const [copied, setCopied] = useState(false);

  const selected =
    drafts.find((pick) => pick.id === selectedId) ?? drafts[0] ?? emptyPick;

  const stats = useMemo(() => {
    const byCategory = new Map<KisaPickCategory, number>();
    drafts.forEach((pick) => {
      byCategory.set(pick.category, (byCategory.get(pick.category) ?? 0) + 1);
    });
    return byCategory;
  }, [drafts]);

  function updateSelected(next: KisaPick) {
    setDrafts((current) =>
      current.map((pick) => (pick.id === selected.id ? next : pick)),
    );
    setSelectedId(next.id);
    setCopied(false);
  }

  function updateField<K extends keyof KisaPick>(key: K, value: KisaPick[K]) {
    updateSelected({ ...selected, [key]: value });
  }

  function addDraft() {
    const id = `new_pick_${drafts.length + 1}`;
    const next = { ...emptyPick, id, name: `New pick ${drafts.length + 1}` };
    setDrafts((current) => [next, ...current]);
    setSelectedId(id);
    setCopied(false);
  }

  function duplicateSelected() {
    const id = normalizeId(`${selected.id}_copy`) || `pick_${drafts.length + 1}`;
    const next = { ...selected, id, name: `${selected.name} Copy` };
    setDrafts((current) => [next, ...current]);
    setSelectedId(id);
    setCopied(false);
  }

  function removeSelected() {
    const nextDrafts = drafts.filter((pick) => pick.id !== selected.id);
    setDrafts(nextDrafts);
    setSelectedId(nextDrafts[0]?.id ?? emptyPick.id);
    setCopied(false);
  }

  async function copyDraftJson() {
    await navigator.clipboard.writeText(JSON.stringify(drafts, null, 2));
    setCopied(true);
  }

  return (
    <Container as="section" size="xl">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-3xl flex-col gap-2">
            <Badge variant="info" className="w-fit">
              KISA Picks
            </Badge>
            <h1 className="type-h1 text-foreground">KISA Picks 관리</h1>
            <p className="type-body text-muted-foreground">
              Edit the map content model before we connect the page to a
              persistent backend. Changes here are local draft changes only.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={addDraft}>
              Add place
            </Button>
            <Button variant="secondary" onClick={duplicateSelected}>
              Duplicate
            </Button>
            <Button onClick={copyDraftJson}>
              {copied ? "Copied JSON" : "Copy JSON"}
            </Button>
          </div>
        </header>

        <Alert variant="warning" title="Draft-only admin v0">
          This page validates the admin workflow inside the KISA admin shell,
          but it does not publish changes yet. Backend storage/API wiring is
          the next slice.
        </Alert>

        <div className="grid gap-4 md:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline" size="sm">
                  {categoryLabels[category]} {stats.get(category) ?? 0}
                </Badge>
              ))}
            </div>

            <div className="flex max-h-[70dvh] flex-col gap-2 overflow-y-auto pr-1">
              {drafts.map((pick) => {
                const isSelected = pick.id === selected.id;
                return (
                  <button
                    key={pick.id}
                    type="button"
                    onClick={() => setSelectedId(pick.id)}
                    className={[
                      "rounded-md border p-3 text-left transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-focus-ring",
                      isSelected
                        ? "border-brand-primary bg-info-subtle"
                        : "border-border bg-surface hover:bg-surface-muted",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="type-body-sm font-semibold text-foreground">
                        {pick.name}
                      </span>
                      <Badge variant="secondary" size="sm">
                        {categoryLabels[pick.category]}
                      </Badge>
                    </div>
                    <p className="type-caption mt-1 text-muted-foreground">
                      {pick.area || "No area"} · {pick.tags.slice(0, 2).join(", ")}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <Card className="gap-5 p-4">
              <CardHeader>
                <CardTitle as="h2">Place fields</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 overflow-visible md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Name
                  </span>
                  <input
                    value={selected.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    ID
                  </span>
                  <input
                    value={selected.id}
                    onChange={(event) =>
                      updateField("id", normalizeId(event.target.value))
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Category
                  </span>
                  <select
                    value={selected.category}
                    onChange={(event) =>
                      updateField("category", event.target.value as KisaPickCategory)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {categoryLabels[category]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Cuisine
                  </span>
                  <input
                    value={selected.cuisine ?? ""}
                    onChange={(event) =>
                      updateField("cuisine", event.target.value || undefined)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Area
                  </span>
                  <input
                    value={selected.area}
                    onChange={(event) => updateField("area", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="type-caption font-semibold text-muted-foreground">
                      Latitude
                    </span>
                    <input
                      type="number"
                      step="0.000001"
                      value={selected.lat}
                      onChange={(event) =>
                        updateField("lat", Number(event.target.value))
                      }
                      className="rounded-md border border-border bg-surface px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="type-caption font-semibold text-muted-foreground">
                      Longitude
                    </span>
                    <input
                      type="number"
                      step="0.000001"
                      value={selected.lng}
                      onChange={(event) =>
                        updateField("lng", Number(event.target.value))
                      }
                      className="rounded-md border border-border bg-surface px-3 py-2"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    KISA note
                  </span>
                  <textarea
                    value={selected.note}
                    onChange={(event) => updateField("note", event.target.value)}
                    rows={3}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    What to order (comma-separated)
                  </span>
                  <input
                    value={toCsv(selected.whatToOrder)}
                    onChange={(event) =>
                      updateField("whatToOrder", toList(event.target.value))
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Tags (comma-separated)
                  </span>
                  <input
                    value={toCsv(selected.tags)}
                    onChange={(event) => updateField("tags", toList(event.target.value))}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Image path
                  </span>
                  <input
                    value={selected.image}
                    onChange={(event) => updateField("image", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Google Maps URL
                  </span>
                  <input
                    value={selected.mapsUrl}
                    onChange={(event) => updateField("mapsUrl", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <div className="flex justify-end md:col-span-2">
                  <Button
                    variant="secondary"
                    onClick={removeSelected}
                    disabled={drafts.length <= 1}
                  >
                    Remove selected
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-4 p-4">
              <CardHeader>
                <CardTitle as="h2">Public card preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 overflow-visible">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface-muted">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="type-h3 text-foreground">{selected.name}</h3>
                  <p className="type-body-sm text-muted-foreground">
                    {selected.area} · {categoryLabels[selected.category]}
                  </p>
                </div>
                <p className="type-body-sm text-foreground">{selected.note}</p>
                {selected.whatToOrder?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.whatToOrder.map((item) => (
                      <Badge key={item} variant="secondary" size="sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
