"use client";

import React from "react";
import InstagramLinkIcon from "@/deprecated-components/shared/InstagramLinkIcon";
import { Icon } from "@umichkisa-ds/web";

export default function Footer() {
  return (
    <div
      className="flex flex-col gap-2 justify-center items-center
      mt-6 py-[30px]"
    >
      <div className="flex items-center gap-3">
        {/* TODO(lane-0.5.5): swap to <Icon name="instagram-brand" /> once DS version bump ships (lane 0.5.6). See PR for bailout context. */}
        <InstagramLinkIcon color="black" />
        <a
          href="mailto:umichkisa@gmail.com"
          rel="nofollow noreferrer"
          aria-label="Email UMich KISA"
          className="inline-flex items-center justify-center"
        >
          <Icon name="mail" size="md" />
        </a>
      </div>

      <p className="type-caption">
        © 2026 University of Michigan Korean International Students Association
      </p>
    </div>
  );
}
