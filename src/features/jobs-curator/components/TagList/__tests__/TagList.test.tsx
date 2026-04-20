// Tests for TagList redesign (Lane 1.4, Phase 1 — jobs-curator).
//
// RED phase of TDD: these tests describe the desired behavior of the new
// inline-wrap filter bar built on DS primitives (ToggleGroup + DateRangePicker).
// They are expected to FAIL against the current (old) implementation that
// uses modals + CountryDropdown + TagButton.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";

// next/font modules need to be mocked in jsdom — the real implementation
// relies on Next's build-time font loader which is not available at test time.
// Imported transitively through the (old) CountryDropdown → fonts module.
vi.mock("next/font/local", () => ({
  default: () => ({ className: "mock-font", style: { fontFamily: "mock" } }),
}));
vi.mock("next/font/google", () => ({
  Heebo: () => ({ className: "mock-font", style: { fontFamily: "mock" } }),
  Montserrat: () => ({ className: "mock-font", style: { fontFamily: "mock" } }),
}));

import TagList from "../index";
import type {
  EmploymentType,
  InternshipType,
} from "../../../types/jobs";

// ---- hoisted spies / mutable state for the context mock ----
const ctxState = vi.hoisted(() => ({
  category: undefined as unknown,
  selectedCountry: "한국" as unknown,
  employmentType: undefined as EmploymentType | undefined,
  internshipTypes: [] as InternshipType[],
  startDate: undefined as Date | undefined,
  endDate: undefined as Date | undefined,
}));

const setCategorySpy = vi.hoisted(() => vi.fn());
const setSelectedCountrySpy = vi.hoisted(() => vi.fn());
const setEmploymentTypeSpy = vi.hoisted(() => vi.fn());
const setInternshipTypesSpy = vi.hoisted(() => vi.fn());
const setStartDateSpy = vi.hoisted(() => vi.fn());
const setEndDateSpy = vi.hoisted(() => vi.fn());

vi.mock("../../../contexts/JobsCuratorContext", () => ({
  useJobsCurator: () => ({
    category: ctxState.category,
    setCategory: setCategorySpy,
    selectedCountry: ctxState.selectedCountry,
    setSelectedCountry: setSelectedCountrySpy,
    employmentType: ctxState.employmentType,
    setEmploymentType: setEmploymentTypeSpy,
    internshipTypes: ctxState.internshipTypes,
    setInternshipTypes: setInternshipTypesSpy,
    startDate: ctxState.startDate,
    setStartDate: setStartDateSpy,
    endDate: ctxState.endDate,
    setEndDate: setEndDateSpy,
  }),
}));

// Stub DateRangePicker from DS so we can deterministically trigger onChange
// without opening the Popover. ToggleGroup remains real so its aria roles
// are exercised by the tests.
vi.mock("@umichkisa-ds/web", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@umichkisa-ds/web")>();
  return {
    ...actual,
    DateRangePicker: ({
      onChange,
    }: {
      onChange?: (r: { from?: Date; to?: Date }) => void;
    }) => (
      <button
        data-testid="date-range-picker"
        onClick={() =>
          onChange?.({
            from: new Date(2026, 5, 1),
            to: new Date(2026, 7, 31),
          })
        }
      >
        date range
      </button>
    ),
  };
});

function resetCtx() {
  ctxState.category = undefined;
  ctxState.selectedCountry = "한국";
  ctxState.employmentType = undefined;
  ctxState.internshipTypes = [];
  ctxState.startDate = undefined;
  ctxState.endDate = undefined;
}

beforeEach(() => {
  resetCtx();
  setCategorySpy.mockClear();
  setSelectedCountrySpy.mockClear();
  setEmploymentTypeSpy.mockClear();
  setInternshipTypesSpy.mockClear();
  setStartDateSpy.mockClear();
  setEndDateSpy.mockClear();
});

describe("TagList — structure", () => {
  it("renders employment ToggleGroup (radiogroup)", () => {
    ctxState.employmentType = "intern";
    render(<TagList />);

    // Employment toggle group is a single-select ToggleGroup → radiogroup,
    // labelled via aria-labelledby → "고용 형태"
    const employmentGroup = screen.getByRole("radiogroup", {
      name: /고용/,
    });
    expect(employmentGroup).toBeInTheDocument();
  });

  it("does NOT render DateRangePicker (deferred — API has no range filter)", () => {
    ctxState.employmentType = "intern";
    render(<TagList />);
    expect(screen.queryByTestId("date-range-picker")).toBeNull();
  });

  it("does NOT render internshipTypes ToggleGroup when employmentType is 'fulltime'", () => {
    ctxState.employmentType = "fulltime";
    render(<TagList />);

    expect(screen.queryByRole("button", { name: "체험형" })).toBeNull();
    expect(screen.queryByRole("button", { name: "전환형" })).toBeNull();
    expect(screen.queryByRole("button", { name: "해외대전형" })).toBeNull();
  });

  it("DOES render internshipTypes ToggleGroup when employmentType is 'intern'", () => {
    ctxState.employmentType = "intern";
    ctxState.internshipTypes = [];
    render(<TagList />);

    // multiple ToggleGroup → role=group; items role=button with aria-pressed
    expect(
      screen.getByRole("button", { name: "체험형" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "전환형" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "해외대전형" })
    ).toBeInTheDocument();
  });
});

describe("TagList — employment ToggleGroup reflects context", () => {
  it("selects 인턴 when employmentType is 'intern'", () => {
    ctxState.employmentType = "intern";
    render(<TagList />);

    expect(screen.getByRole("radio", { name: "인턴" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: "정규직" })).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });

  it("selects 정규직 when employmentType is 'fulltime'", () => {
    ctxState.employmentType = "fulltime";
    render(<TagList />);

    expect(screen.getByRole("radio", { name: "인턴" })).toHaveAttribute(
      "aria-checked",
      "false"
    );
    expect(screen.getByRole("radio", { name: "정규직" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("defaults to 인턴 when employmentType is undefined (display-only fallback)", () => {
    ctxState.employmentType = undefined;
    render(<TagList />);

    expect(screen.getByRole("radio", { name: "인턴" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: "정규직" })).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });
});

describe("TagList — employment ToggleGroup click handlers", () => {
  it("clicking 인턴 calls setEmploymentType('intern')", () => {
    ctxState.employmentType = "fulltime";
    render(<TagList />);

    fireEvent.click(screen.getByRole("radio", { name: "인턴" }));
    expect(setEmploymentTypeSpy).toHaveBeenCalledWith("intern");
  });

  it("clicking 정규직 calls setEmploymentType('fulltime')", () => {
    ctxState.employmentType = "intern";
    render(<TagList />);

    fireEvent.click(screen.getByRole("radio", { name: "정규직" }));
    expect(setEmploymentTypeSpy).toHaveBeenCalledWith("fulltime");
  });
});

describe("TagList — internshipTypes ToggleGroup", () => {
  it("aria-pressed reflects membership in context internshipTypes", () => {
    ctxState.employmentType = "intern";
    ctxState.internshipTypes = ["experiential", "convertible"];
    render(<TagList />);

    expect(
      screen.getByRole("button", { name: "체험형" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "전환형" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "해외대전형" })
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("clicking an unselected internshipType calls setInternshipTypes with the value added", async () => {
    
    ctxState.employmentType = "intern";
    ctxState.internshipTypes = ["experiential"];
    render(<TagList />);

    fireEvent.click(screen.getByRole("button", { name: "전환형" }));
    expect(setInternshipTypesSpy).toHaveBeenCalledTimes(1);
    const arg = setInternshipTypesSpy.mock.calls[0][0] as InternshipType[];
    expect(arg).toEqual(expect.arrayContaining(["experiential", "convertible"]));
    expect(arg).toHaveLength(2);
  });

  it("clicking a selected internshipType calls setInternshipTypes with the value removed", async () => {
    
    ctxState.employmentType = "intern";
    ctxState.internshipTypes = ["experiential", "convertible"];
    render(<TagList />);

    fireEvent.click(screen.getByRole("button", { name: "전환형" }));
    expect(setInternshipTypesSpy).toHaveBeenCalledTimes(1);
    const arg = setInternshipTypesSpy.mock.calls[0][0] as InternshipType[];
    expect(arg).toEqual(["experiential"]);
  });
});

describe("TagList — selecting fulltime clears internshipTypes", () => {
  it("clicking 정규직 while internshipTypes is non-empty calls setInternshipTypes([]) and setEmploymentType('fulltime')", async () => {
    
    ctxState.employmentType = "intern";
    ctxState.internshipTypes = ["experiential", "convertible"];
    render(<TagList />);

    fireEvent.click(screen.getByRole("radio", { name: "정규직" }));

    expect(setEmploymentTypeSpy).toHaveBeenCalledWith("fulltime");
    expect(setInternshipTypesSpy).toHaveBeenCalledWith([]);
  });
});

// DateRangePicker wiring tests deferred — the component is commented out in
// TagList.tsx (MVP: wanted API has no range filter). Re-enable once the API
// supports startDate/endDate filtering and the TagList JSX block is restored.
describe.skip("TagList — DateRangePicker wiring (deferred)", () => {
  it("selecting a range calls setStartDate(from) and setEndDate(to)", () => {
    ctxState.employmentType = "intern";
    render(<TagList />);

    fireEvent.click(screen.getByTestId("date-range-picker"));

    expect(setStartDateSpy).toHaveBeenCalledTimes(1);
    expect(setEndDateSpy).toHaveBeenCalledTimes(1);
    const fromArg = setStartDateSpy.mock.calls[0][0] as Date;
    const toArg = setEndDateSpy.mock.calls[0][0] as Date;
    expect(fromArg).toBeInstanceOf(Date);
    expect(toArg).toBeInstanceOf(Date);
    expect(fromArg.getTime()).toBe(new Date(2026, 5, 1).getTime());
    expect(toArg.getTime()).toBe(new Date(2026, 7, 31).getTime());
  });
});

// Silence unused-import warning for `within` if linting strict — kept available
// for future refinement of scoped queries within the ToggleGroup containers.
void within;
