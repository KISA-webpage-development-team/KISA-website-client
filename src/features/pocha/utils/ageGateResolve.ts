export type AgeGateInput = {
  ageCheckRequired: boolean;
  underAge: boolean | null | undefined;
};

export type AgeGateResult =
  | { allowed: true; reason: "allowed" | "not-required" }
  | { allowed: false; reason: "underage" };

export function ageGateResolve(input: AgeGateInput): AgeGateResult {
  if (!input.ageCheckRequired) {
    return { allowed: true, reason: "not-required" };
  }
  if (input.underAge === false) {
    return { allowed: true, reason: "allowed" };
  }
  return { allowed: false, reason: "underage" };
}
