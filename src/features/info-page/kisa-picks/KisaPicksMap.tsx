"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type {
  LngLatBoundsLike,
  Map as MapLibreMap,
  Marker,
} from "maplibre-gl";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { StyleSpecification } from "@maplibre/maplibre-gl-style-spec";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@umichkisa-ds/web";
import {
  Coffee,
  ExternalLink,
  MapPin,
  Navigation,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wine,
} from "lucide-react";
import {
  categoryLabels,
  defaultPick,
  kisaPicks,
  type KisaPick,
  type KisaPickCategory,
} from "./kisaPicksData";

type Filter = "all" | KisaPickCategory | "korean" | "asian" | "dessert";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "restaurant", label: "Restaurant" },
  { id: "cafe", label: "Cafe" },
  { id: "store", label: "Store" },
  { id: "drinks", label: "Drinks / Bar" },
  { id: "things", label: "Things to do" },
  { id: "korean", label: "Korean" },
  { id: "asian", label: "Asian" },
  { id: "dessert", label: "Dessert" },
];

const categoryIcons: Record<KisaPickCategory, typeof Utensils> = {
  restaurant: Utensils,
  cafe: Coffee,
  store: ShoppingBag,
  drinks: Wine,
  things: Sparkles,
};

const markerIcons: Record<KisaPickCategory, string> = {
  restaurant:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v8M11 2v8M9 2v20M17 2v20M15 2v8a2 2 0 0 0 4 0V2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  cafe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm12 2h2a3 3 0 0 1 0 6h-2M6 2v2M10 2v2M14 2v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  store:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 13H7L6 8Zm3 0a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  drinks:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2h8l-1 9a4 4 0 0 1-6 0L8 2Zm4 11v8M9 21h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  things:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.4 6.8H22l-6 4.4 2.2 6.8L12 15.8 5.8 20 8 13.2 2 8.8h7.6L12 2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
};

const minimalAnnArborStyle: StyleSpecification = {
  version: 8,
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#f8fafc" },
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      paint: { "fill-color": "#dbeafe", "fill-opacity": 0.85 },
    },
    {
      id: "parks",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "park",
      paint: { "fill-color": "#e8f3eb", "fill-opacity": 0.48 },
    },
    {
      id: "roads-thin",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "match",
        ["get", "class"],
        ["minor", "service", "residential", "track", "path"],
        true,
        false,
      ],
      paint: {
        "line-color": "#cbd5e1",
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.5, 15, 1.7],
        "line-opacity": 0.9,
      },
    },
    {
      id: "roads-main",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "match",
        ["get", "class"],
        ["motorway", "trunk", "primary", "secondary", "tertiary"],
        true,
        false,
      ],
      paint: {
        "line-color": "#94a3b8",
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 1.2, 15, 3.4],
        "line-opacity": 0.88,
      },
    },
    {
      id: "road-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 13,
      layout: {
        "symbol-placement": "line",
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 11,
      },
      paint: {
        "text-color": "#64748b",
        "text-halo-color": "#f8fafc",
        "text-halo-width": 1.2,
      },
    },
  ],
};

const universityParcelsUrl =
  "https://services8.arcgis.com/CBiB2HwHGXUi8D4Y/ArcGIS/rest/services/Ann_Arbor_University_(University_of_Michigan)/FeatureServer/0/query?where=MWNERNAME1%3D%27University%20of%20Michigan%27&outFields=MWNERNAME1,PACKEDPIN&returnGeometry=true&outSR=4326&f=geojson";

const centralCampusBox = {
  west: -83.7488,
  east: -83.724,
  south: 42.269,
  north: 42.285,
};

const northCampusBox = {
  west: -83.731,
  east: -83.701,
  south: 42.282,
  north: 42.302,
};

const annArborBounds: LngLatBoundsLike = [
  [-83.775, 42.232],
  [-83.695, 42.311],
];

const campusBounds: LngLatBoundsLike = [
  [-83.751, 42.271],
  [-83.708, 42.297],
];

const desktopMapPadding = { top: 96, right: 64, bottom: 64, left: 380 };
const mobileMapPadding = { top: 96, right: 32, bottom: 270, left: 32 };

type CampusName = "Central Campus" | "North Campus";
type CampusBox = typeof centralCampusBox;
type Position = [number, number];
type ParcelProperties = Record<string, unknown> & { campus?: CampusName };
type ParcelFeature = Feature<Polygon | MultiPolygon, ParcelProperties>;
type ParcelCollection = FeatureCollection<Polygon | MultiPolygon, ParcelProperties>;

function isFiltered(pick: KisaPick, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "korean") return pick.cuisine === "Korean";
  if (filter === "asian") {
    return ["Asian", "Chinese", "Thai", "Japanese"].includes(pick.cuisine ?? "");
  }
  if (filter === "dessert") return pick.cuisine === "Dessert";
  return pick.category === filter;
}

function getPositions(feature: ParcelFeature): Position[] {
  if (feature.geometry.type === "Polygon") {
    return (feature.geometry.coordinates as Position[][]).flat();
  }

  return (feature.geometry.coordinates as Position[][][]).flat(2);
}

function getFeatureCenter(feature: ParcelFeature) {
  const positions = getPositions(feature);
  const totals = positions.reduce(
    (sum, [lng, lat]) => ({ lng: sum.lng + lng, lat: sum.lat + lat }),
    { lng: 0, lat: 0 },
  );

  return {
    lng: totals.lng / positions.length,
    lat: totals.lat / positions.length,
  };
}

function isInsideBox(feature: ParcelFeature, box: CampusBox) {
  const center = getFeatureCenter(feature);
  return (
    center.lng >= box.west &&
    center.lng <= box.east &&
    center.lat >= box.south &&
    center.lat <= box.north
  );
}

async function getCampusParcelAreas(): Promise<ParcelCollection> {
  const response = await fetch(universityParcelsUrl);
  if (!response.ok) {
    throw new Error(`Could not load U-M parcel geometry (${response.status})`);
  }

  const data = (await response.json()) as ParcelCollection;
  const features = data.features
    .map((feature) => {
      const campus: CampusName | null = isInsideBox(feature, centralCampusBox)
        ? "Central Campus"
        : isInsideBox(feature, northCampusBox)
          ? "North Campus"
          : null;

      if (!campus) return null;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          campus,
        },
      };
    })
    .filter((feature) => feature !== null);

  return {
    type: "FeatureCollection",
    features,
  };
}

async function addCampusAreas(map: MapLibreMap) {
  if (map.getSource("kisa-campus-areas")) return;
  const campusAreas = await getCampusParcelAreas();

  map.addSource("kisa-campus-areas", {
    type: "geojson",
    data: campusAreas,
  });

  map.addLayer({
    id: "kisa-campus-fill",
    type: "fill",
    source: "kisa-campus-areas",
    paint: {
      "fill-color": [
        "match",
        ["get", "campus"],
        "Central Campus",
        "#ffcb05",
        "North Campus",
        "#3b82f6",
        "#00274c",
      ],
      "fill-opacity": 0.13,
    },
  });

  map.addLayer({
    id: "kisa-campus-outline",
    type: "line",
    source: "kisa-campus-areas",
    paint: {
      "line-color": [
        "match",
        ["get", "campus"],
        "Central Campus",
        "#b78b00",
        "North Campus",
        "#1d4ed8",
        "#00274c",
      ],
      "line-width": 1.2,
      "line-opacity": 0.42,
    },
  });

  map.addSource("kisa-campus-labels", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { campus: "Central Campus" },
          geometry: { type: "Point", coordinates: [-83.735, 42.278] },
        },
        {
          type: "Feature",
          properties: { campus: "North Campus" },
          geometry: { type: "Point", coordinates: [-83.716, 42.2915] },
        },
      ],
    },
  });

  map.addLayer({
    id: "kisa-campus-label",
    type: "symbol",
    source: "kisa-campus-labels",
    layout: {
      "text-field": ["get", "campus"],
      "text-size": 13,
      "text-font": ["Noto Sans Regular"],
      "text-anchor": "center",
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": "#00274c",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.4,
    },
  });
}

function makeMarkerElement(pick: KisaPick, isSelected: boolean) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", `Select ${pick.name}`);
  button.setAttribute("aria-pressed", String(isSelected));
  button.title = pick.name;
  button.className = [
    "flex size-10 items-center justify-center rounded-full border shadow-md transition-all",
    "focus-visible:outline-2 focus-visible:outline-focus-ring",
    isSelected
      ? "border-brand-primary bg-brand-primary text-brand-foreground ring-4 ring-brand-primary/20"
      : "border-border-strong bg-surface/95 text-foreground hover:border-brand-primary hover:bg-info-subtle",
  ].join(" ");

  const label = document.createElement("span");
  label.className = "flex size-5 items-center justify-center [&_svg]:size-4";
  label.innerHTML = markerIcons[pick.category];

  button.append(label);

  return button;
}

export default function KisaPicksMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<KisaPick>(defaultPick);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  function getMapPadding() {
    if (typeof window === "undefined") return desktopMapPadding;
    return window.innerWidth < 768 ? mobileMapPadding : desktopMapPadding;
  }

  const visiblePicks = useMemo(
    () => kisaPicks.filter((pick) => isFiltered(pick, activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    if (!visiblePicks.some((pick) => pick.id === selected.id)) {
      setSelected(visiblePicks[0] ?? defaultPick);
    }
  }, [selected.id, visiblePicks]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: minimalAnnArborStyle,
      bounds: campusBounds,
      fitBoundsOptions: {
        padding: getMapPadding(),
      },
      maxBounds: annArborBounds,
      minZoom: 11.2,
      maxZoom: 17,
      attributionControl: { compact: true },
    });

    mapRef.current = map;
    const slowLoadTimer = window.setTimeout(() => {
      setMapError(
        "The map tiles are taking too long to load. Try refreshing, or check that your browser can reach OpenFreeMap.",
      );
    }, 10000);

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    map.on("load", () => {
      addCampusAreas(map).catch((error) => {
        setMapError(
          error instanceof Error
            ? error.message
            : "Could not load U-M campus overlays.",
        );
      });
      map.resize();
    });

    map.once("idle", () => {
      window.clearTimeout(slowLoadTimer);
      setIsMapReady(true);
      setMapError(null);
    });

    map.on("error", (event) => {
      setMapError(event.error?.message ?? "MapLibre could not load the map.");
    });

    return () => {
      window.clearTimeout(slowLoadTimer);
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = visiblePicks.map((pick) => {
      const markerElement = makeMarkerElement(pick, selected.id === pick.id);
      markerElement.addEventListener("click", () => setSelected(pick));

      return new maplibregl.Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat([pick.lng, pick.lat])
        .addTo(map);
    });
  }, [isMapReady, selected.id, visiblePicks]);

  function resetMap() {
    mapRef.current?.fitBounds(campusBounds, {
      padding: getMapPadding(),
      duration: 650,
    });
  }

  const SelectedIcon = categoryIcons[selected.category];

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-3xl flex-col gap-2">
          <Badge variant="info" className="w-fit">
            KISA Picks
          </Badge>
          <h1 className="type-h1 text-foreground">
            Ann Arbor, curated for KISA
          </h1>
          <p className="type-body text-muted-foreground">
            Real Ann Arbor geography with KISA-curated picks layered on top.
            Central and North Campus are highlighted so it is easier to orient.
          </p>
        </div>
        <div className="type-body-sm text-muted-foreground">
          {visiblePicks.length} spots shown
        </div>
      </header>

      <div className="relative min-h-[680px] overflow-hidden rounded-lg border border-border bg-surface-subtle shadow-sm md:min-h-[720px]">
        <div className="absolute left-3 right-3 top-3 z-30 flex gap-2 overflow-x-auto pb-2 md:left-5 md:right-auto md:max-w-[760px] md:flex-wrap md:overflow-visible md:pb-0">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={[
                  "type-body-sm shrink-0 rounded-md border px-3 py-1.5 transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-focus-ring",
                  isActive
                    ? "border-brand-primary bg-brand-primary text-brand-foreground"
                    : "border-border bg-surface/95 text-foreground hover:border-brand-primary hover:bg-info-subtle",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <aside className="absolute bottom-4 left-4 right-4 z-30 md:bottom-auto md:right-auto md:top-24 md:w-[330px]">
          <Card className="gap-3 border-border-strong bg-surface/95 p-3 shadow-lg backdrop-blur">
            <div className="relative aspect-[2/1] overflow-hidden rounded-md bg-surface-muted md:aspect-[16/9]">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="(min-width: 768px) 330px, 100vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle as="h2" className="line-clamp-none">
                    {selected.name}
                  </CardTitle>
                  <p className="type-body-sm text-muted-foreground">
                    {selected.area} · {categoryLabels[selected.category]}
                  </p>
                </div>
                <SelectedIcon
                  className="mt-1 size-5 shrink-0 text-info"
                  aria-hidden
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 overflow-visible">
              <p className="type-body-sm text-foreground">{selected.note}</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    mapRef.current?.flyTo({
                      center: [selected.lng, selected.lat],
                      zoom: 15.2,
                      duration: 550,
                    })
                  }
                >
                  <Navigation className="size-4" aria-hidden />
                  Show spot
                </Button>
                <a
                  href={selected.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="type-body-sm inline-flex items-center justify-center gap-2 rounded-md border border-brand-primary bg-brand-primary px-3 py-2 font-semibold text-brand-foreground transition-colors hover:bg-brand-primary-hover"
                >
                  Maps
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="absolute right-4 top-20 z-30 flex flex-col gap-2 md:bottom-24 md:top-auto">
          <Button
            variant="secondary"
            size="sm"
            className="h-10 w-10 p-0"
            aria-label="Reset map view"
            onClick={resetMap}
          >
            <MapPin className="size-4" aria-hidden />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 z-30 hidden rounded-md border border-border bg-surface/90 p-2 shadow-sm backdrop-blur md:block">
          <div className="type-caption flex items-center gap-2 text-muted-foreground">
            <span className="h-3 w-3 rounded-sm bg-[#ffcb05]/40 ring-1 ring-[#b78b00]" />
            Central Campus
          </div>
          <div className="type-caption mt-1 flex items-center gap-2 text-muted-foreground">
            <span className="h-3 w-3 rounded-sm bg-blue-500/25 ring-1 ring-blue-700" />
            North Campus
          </div>
        </div>

        <div
          ref={mapContainerRef}
          className="absolute inset-0"
          style={{ position: "absolute", inset: 0 }}
        />
        {!isMapReady && !mapError ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-subtle/80">
            <div className="rounded-md border border-border bg-surface px-4 py-3 text-center shadow-sm">
              <p className="type-body-sm font-semibold text-foreground">
                Loading Ann Arbor map
              </p>
              <p className="type-caption mt-1 text-muted-foreground">
                Pulling real map tiles and campus areas.
              </p>
            </div>
          </div>
        ) : null}
        {mapError ? (
          <div className="absolute inset-x-4 bottom-4 z-40 md:inset-x-auto md:left-1/2 md:w-[420px] md:-translate-x-1/2">
            <div className="rounded-md border border-error bg-surface px-4 py-3 shadow-lg">
              <p className="type-body-sm font-semibold text-foreground">
                Map did not load
              </p>
              <p className="type-caption mt-1 text-muted-foreground">
                {mapError}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
