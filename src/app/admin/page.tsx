"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@umichkisa-ds/web";
import AdminHubHero from "@/components/layout/admin/AdminHubHero";
import AdminHubCards from "@/components/layout/admin/AdminHubCards";
import AdminHubAppsList from "@/components/layout/admin/AdminHubAppsList";

type Mode = "default" | "apps";

const SWAP_MS = 250;

export default function AdminHubPage() {
  const [mode, setMode] = useState<Mode>("default");
  const didMountRef = useRef(false);
  const defaultToggleRef = useRef<HTMLButtonElement>(null);
  const appsToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const target =
      mode === "default" ? defaultToggleRef.current : appsToggleRef.current;
    target?.focus();
  }, [mode]);

  const isDefault = mode === "default";

  return (
    <Container as="main" size="xl" className="py-12">
      <div className="flex min-h-[calc(100dvh-12rem)] items-center">
        {/* Crossfade swap container — both modes rendered as siblings, stacked
            in the same grid cell so the larger one reserves height. */}
        <div className="relative grid w-full">
          {/* DEFAULT MODE — 3×2 grid: hero[0,0] + 5 tool cards */}
          <section
            aria-hidden={!isDefault}
            className={[
              "col-start-1 row-start-1 transition-opacity motion-reduce:transition-none",
              isDefault ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            style={{ transitionDuration: `${SWAP_MS}ms` }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AdminHubHero
                ref={defaultToggleRef}
                mode="default"
                onToggle={() => setMode("apps")}
              />
              <AdminHubCards />
            </div>
          </section>

          {/* APPS MODE — same 3-col grid, hero[0,0] + 3 app cards */}
          <section
            aria-hidden={isDefault}
            className={[
              "col-start-1 row-start-1 transition-opacity motion-reduce:transition-none",
              !isDefault ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            style={{ transitionDuration: `${SWAP_MS}ms` }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AdminHubHero
                ref={appsToggleRef}
                mode="apps"
                onToggle={() => setMode("default")}
              />
              <AdminHubAppsList />
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
