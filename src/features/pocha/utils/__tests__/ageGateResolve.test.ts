import { describe, it, expect } from "vitest";
import { ageGateResolve } from "../ageGateResolve";

describe("ageGateResolve", () => {
  it("returns allowed=true reason='not-required' when age check is not required", () => {
    expect(ageGateResolve({ ageCheckRequired: false, underAge: false })).toEqual({
      allowed: true,
      reason: "not-required",
    });
    expect(ageGateResolve({ ageCheckRequired: false, underAge: true })).toEqual({
      allowed: true,
      reason: "not-required",
    });
    expect(ageGateResolve({ ageCheckRequired: false, underAge: null })).toEqual({
      allowed: true,
      reason: "not-required",
    });
  });

  it("returns allowed=true reason='allowed' when age check passes", () => {
    expect(ageGateResolve({ ageCheckRequired: true, underAge: false })).toEqual({
      allowed: true,
      reason: "allowed",
    });
  });

  it("returns allowed=false reason='underage' when user is underage", () => {
    expect(ageGateResolve({ ageCheckRequired: true, underAge: true })).toEqual({
      allowed: false,
      reason: "underage",
    });
  });

  it("fails closed when underAge is null (still loading)", () => {
    expect(ageGateResolve({ ageCheckRequired: true, underAge: null })).toEqual({
      allowed: false,
      reason: "underage",
    });
  });

  it("fails closed when underAge is undefined", () => {
    expect(ageGateResolve({ ageCheckRequired: true, underAge: undefined })).toEqual({
      allowed: false,
      reason: "underage",
    });
  });
});
