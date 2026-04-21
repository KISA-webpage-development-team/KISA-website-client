"use client";

import React from "react";
import { Icon } from "@umichkisa-ds/web";

export default function Footer() {
  return (
    <div
      className="flex flex-col gap-2 justify-center items-center
      mt-16 py-8"
    >
      <div className="flex items-center gap-3">
        <a
          href="https://www.instagram.com/kisa_michigan/"
          target="_blank"
          rel="nofollow noreferrer"
          aria-label="UMich KISA on Instagram"
          className="inline-flex items-center justify-center"
        >
          <Icon name="instagram-brand" size="md" />
        </a>
        <a
          href="mailto:umichkisa@gmail.com"
          rel="nofollow noreferrer"
          aria-label="Email UMich KISA"
          className="inline-flex items-center justify-center"
        >
          <Icon name="mail" size="md" />
        </a>
      </div>

      <p className="type-caption text-center text-balance px-4">
        © 2026 University of Michigan Korean International Students Association
      </p>
    </div>
  );
}
