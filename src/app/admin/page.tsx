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

  // Focus the matching toggle in the new mode after a swap.
  // Skip on initial mount so the page doesn't auto-steal focus on load.
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
    <Container as="main" size="xl" className="py-8 lg:py-12">
      {/* Crossfade swap container — both modes rendered as siblings; the inactive
          one is hidden via opacity + pointer-events + aria-hidden. Height is
          reserved by the larger of the two via grid stacking, so toggling
          neither pops layout nor triggers scrollbar shifts. */}
      <div className="relative grid">
        {/* DEFAULT MODE */}
        <section
          aria-hidden={!isDefault}
          className={[
            "col-start-1 row-start-1 transition-opacity duration-[250ms] motion-reduce:transition-none",
            isDefault
              ? "opacity-100"
              : "pointer-events-none opacity-0",
          ].join(" ")}
          style={{ transitionDuration: `${SWAP_MS}ms` }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <AdminHubHero
                ref={defaultToggleRef}
                mode="default"
                onToggle={() => setMode("apps")}
              />
            </div>
            <div className="lg:col-span-2">
              <AdminHubCards />
            </div>
          </div>
        </section>

        {/* APPS MODE */}
        <section
          aria-hidden={isDefault}
          className={[
            "col-start-1 row-start-1 transition-opacity duration-[250ms] motion-reduce:transition-none",
            !isDefault
              ? "opacity-100"
              : "pointer-events-none opacity-0",
          ].join(" ")}
          style={{ transitionDuration: `${SWAP_MS}ms` }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <AdminHubHero
                ref={appsToggleRef}
                mode="apps"
                onToggle={() => setMode("default")}
              />
            </div>
            <div className="lg:col-span-2">
              <AdminHubAppsList />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
