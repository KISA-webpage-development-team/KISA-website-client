"use client";

import Image from "next/image";

import { Icon, LinkButton } from "@umichkisa-ds/web";

import {
  sponsorData,
  SPONSOR_FORM_URL,
} from "@/features/home/data/sponsorData";

function logoSrc(sponsorID: string): string {
  return `/sponsor/logo/${sponsorID}.png`;
}

/**
 * Horizontal logo strip for KISA's corporate sponsors. Sits below the fold —
 * prospective-student attention goes to the upper sections first; this is a
 * gratitude/disclosure surface, not a CTA region.
 */
export default function SponsorStrip() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h2 className="type-h2 text-foreground">KISA를 후원해주시는 분들</h2>
      </header>

      <ul className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {sponsorData.map((sponsor) => (
          <li key={sponsor.id}>
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-square overflow-hidden rounded-md border border-border bg-surface p-3 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <div className="relative h-full w-full">
                <Image
                  src={logoSrc(sponsor.id)}
                  alt={sponsor.title}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-contain"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <LinkButton
          href={SPONSOR_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="md"
          className="inline-flex items-center gap-2"
        >
          후원사 신청
          <Icon name="external-link" size="sm" />
        </LinkButton>
      </div>
    </div>
  );
}
